import {Component, OnInit} from '@angular/core';
import {Uppy, UppyOptions} from '@uppy/core';
// ignore module non existant for uppy locale
// @ts-ignore
import French from '@uppy/locales/lib/fr_FR.js';

import XHR, {XHRUploadOptions} from '@uppy/xhr-upload';
import {baseUrl} from "../../../../../config/server.config";
import {Store} from "@ngrx/store";
import AppStore from "../../../../store/Appstore";
import {DataDto} from "../../../../dto/data.dto";
import {Validators} from "@angular/forms";
import {FormActionProps, InputList} from "@common-components/interfaces";
import {HttpClient} from "@angular/common/http";
import {ICRUDService} from "@common-components/services/crud/interfaces";
import {CrudService} from "../../../../services/base-crud";
import {firstValueFrom, Observable} from "rxjs";
import {ActivatedRoute, Navigation, Router} from "@angular/router";
import {showSuccess, startApiCall} from "@common-components/services/sweet-alert.util";
import {ObserverObject} from "@common-components/services/util";


@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {

  fileUploader!: Uppy;
  formActions: FormActionProps[] = [
    {
      label: "Enregistrer",
      color: "primary",
      validDataOnly: true
    },
    {
      label: "Retour",
      color: "",
			onClick: async () => await this.router.navigate(["management", "service", "liste"])
    }
  ];

  formInputs: InputList = {
    name: {
      label: "Nom du service",
      type: "text",
      validators: Validators.required
    },
    duration: {
      label: "Duration du service",
      type: "number",
      validators: [Validators.required, Validators.min(1)]
    },
    price: {
      label: "Prix",
      type: "number",
      validators: [Validators.required, Validators.min(1)]
    },
    commission: {
      label: "Commission de l'employé",
      type: "number",
      validators: [Validators.required, Validators.min(1), Validators.max(100)]
    }
  };

  imageUrls: string[] = [];
  crudService: ICRUDService;
  formDefaultValue: any = {};
  currentId?: string;
  title: string = "Création de service";

  constructor(
    private store: Store<AppStore>,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.crudService = new CrudService("services", http);
    const {id} = this.route.snapshot.params;
    const navigation = this.router.getCurrentNavigation();
    if (id) {
      this.currentId = id;
      this.setUpdateMode(navigation);
    }
  }

  setUpdateMode(navigation: Navigation | null) {
    this.title = "Modification d'un service";
    const apiCall = async (close: Function) => {
      if (!this.currentId) return close();
      try {
        let service: any = navigation?.extras.state;
        if (!service) {
          service = (await firstValueFrom(this.crudService.findById<DataDto<any>>(this.currentId))).data;
        }
        const {pictureUrls, commission, ...rest} = service;
        rest.commission = commission * 100;
        this.formDefaultValue = rest;
        this.imageUrls = await this.addImages(pictureUrls);
        close();
      }
      catch (e) {
        new Observable(subscriber => {
          throw e
        }).subscribe(ObserverObject(() => {}))
      }
    }
    startApiCall(apiCall);
  }

  async ngOnInit() {
    this.initUppyUploader();
  }

  async addImages(images: string[]): Promise<string[]> {
    return await Promise.all(images.map(this.addImage.bind(this)));
  }

  async addImage(image: string) {
    const array = image.split(".");
    const ext = array.pop();
    const name = array.pop();
    const blob = await fetch(image).then(response => response.blob());
    this.fileUploader.addFile({
      name: `${name}.${ext}`,
      data: blob,
      meta: {
        type: blob.type
      }
    })
    return image;
  }

  initUppyUploader() {
    this.store.pipe().subscribe((appStore: AppStore) => {
      const xhrOptions: XHRUploadOptions = {
        endpoint: baseUrl("upload/image"),
        method: "POST",
        formData: true,
        fieldName: "image",
        getResponseData: this.handleFileUploadSuccess.bind(this),
        getResponseError: this.handleFileUploadError.bind(this),
        headers: {
          Authorization: `Bearer ${appStore.user.token}`
        }
      }

      const uppyOptions: UppyOptions = {
        debug: true,
        autoProceed: false,
        locale: {
          strings: {
            ...French.strings,
            done: "Modifier",
            uploadXFiles: {
              '0': 'Valider mon image',
              '1': 'Valider mes images'
            }
          }
        },
        restrictions : {
          maxNumberOfFiles: 3,
          maxFileSize: 2000000,
          allowedFileTypes: [".jpg", ".png", ".jpeg"]
        }
      }

      // setup uppy uploader
      this.fileUploader = new Uppy(uppyOptions)
      .use(XHR, xhrOptions)
      .on('complete', (result) => {
        this.imageUrls = result.successful.map(oneSuccess => oneSuccess.uploadURL);
        // add onclick to the reset button and reset stored url
        document.querySelector("button.uppy-u-reset")?.addEventListener('click', this.onChangeImage.bind(this));
      });
    })
  }

  onChangeImage() {
    this.imageUrls = [];
  }

  handleFileUploadError (responseText: string, xhr: any) {
    const errorResponse: DataDto<any> = JSON.parse(responseText);
    return new Error(errorResponse.error?.message);
  }

  handleFileUploadSuccess(responseText: string, response: unknown) {
    const successResponse: DataDto<{url: string}> = JSON.parse(responseText);
    return successResponse.data;
  }

  apiCallFunctionOnSubmit(data: any) {
    if (this.imageUrls.length == 0) {
      return new Observable(subscriber => {
        const error = new Error() as any;
        error.message = "Veuillez insérer et valider vos images";
        error.status = 400;
        error.error = {
          error: {
            code: 400,
            message: error.message
          }
        }
        throw error;
      })
    }
    const body = {
      ...data,
      commission: data.commission / 100,
      pictureUrls: this.imageUrls
    }
    return this.crudService.create(body);
  }

  onApiCallSuccess() {
    showSuccess(async () => {
      await this.router.navigate(["management", "service", "liste"]);
    }, "Enregistré avec succès");
  }


}
