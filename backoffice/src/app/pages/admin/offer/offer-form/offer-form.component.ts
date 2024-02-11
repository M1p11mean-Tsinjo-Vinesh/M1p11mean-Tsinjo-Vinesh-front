import {Component, ViewChild} from '@angular/core';
import {
  extract,
  extractAndPipe,
  FormActionProps,
  InputList,
  MultiSelectProps,
  SelectProps
} from "@common-components/interfaces";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Uppy, UppyOptions} from "@uppy/core";
import AppStore from "../../../../store/Appstore";
import XHR, {XHRUploadOptions} from "@uppy/xhr-upload";
import {baseUrl} from "../../../../../config/server.config";
import {Store} from "@ngrx/store";
import {DataDto} from "../../../../dto/data.dto";
// @ts-ignore
import French from '@uppy/locales/lib/fr_FR.js';
import {ICRUDService} from "@common-components/services/crud/interfaces";
import {CrudService} from "../../../../services/base-crud";
import {HttpClient} from "@angular/common/http";
import {ServiceDTO} from "../../../../dto/service.dto";
import {DecimalPipe} from "@angular/common";
import {Subject, takeUntil} from "rxjs";
import {ListComponent} from "@common-components/list/list.component";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss']
})
export class OfferFormComponent {
  title: string = "Création d'offre";

  formInputs: InputList = {
    name: {
      label: "Nom de l'offre",
      type: "text",
      validators: Validators.required
    },
    description: {
      label: "Description",
      type: "text",
      validators: Validators.required
    },
  }
  formActions: FormActionProps[] =[
    {
      label: "Enregistrer",
      color: "primary",
      validDataOnly: true
    },
    {
      label: "Retour",
      color: "",
      onClick: async () => await this.router.navigate(["management", "offer", "liste"])
    }
  ]
  formDefaultValue: any = {};

  fileUploader!: Uppy;
  uppyOptions: UppyOptions = {
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
  imageUrls: string[] = [];
  currentId?: string;

  serviceService: ICRUDService;
  serviceList?: ServiceDTO[]
  filteredServiceList: ServiceDTO[] = [];
  serviceFilter: FormControl = new FormControl();
  _onDestroy = new Subject<void>();

  selectedService = new FormControl<ServiceDTO| undefined>(undefined);

  @ViewChild("serviceListComponent")
  serviceListComponent?: ListComponent;
  serviceListHeaders: string[] = ["Nom", "Prix initial (Ar)", "Reduction", "Prix après réduction (Ar)"];

  serviceGetters = [
    extract("name"),
    extractAndPipe("price", this.decimalPipe),
    (row: ServiceDTO) => {
      console.log("row", row)
      return this.sanitizer.bypassSecurityTrustHtml(`<input id="discount-${row.name}" type="number" min="0" max="100" value="${this.decimalPipe.transform((row.discount ?? 0) * 100)}"/> %`)
    },
    (row: ServiceDTO) => this.decimalPipe.transform(row.price * (1 - (row.discount ?? 0)))
  ]
  selectedServices: ServiceDTO[] = [
    {
      _id: "1",
      name: "Service 1",
      duration: 60,
      price: 10000,
      commission: 20,
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
      updatedby: "admin",
      __v: 0,
      pictureUrls: [],
      discount: 0
    }
  ];


  constructor(
    private decimalPipe: DecimalPipe,
    private store: Store<AppStore>,
    private router: Router,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {
    this.serviceService = new CrudService("services", this.http);
  }

  ngOnInit() {
    this.initUppyUploader();
    this.fetchServices();
    this.serviceFilter.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(this.filterServices.bind(this));
    this.selectedService.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(this.addServiceToList.bind(this));
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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

      // setup uppy uploader
      this.fileUploader = new Uppy(this.uppyOptions)
        .use(XHR, xhrOptions)
        .on('complete', (result) => {
          this.imageUrls = result.successful.map(oneSuccess => oneSuccess.uploadURL);
          // add onclick to the reset button and reset stored url
          document.querySelector("button.uppy-u-reset")?.addEventListener('click', this.onChangeImage.bind(this));
        })
        // if the form is on update mode, we should show the validate button on file changes
        .on('cancel-all', this.showValidationButton.bind(this))
        .on('file-removed', this.showValidationButton.bind(this))
        .on('files-added', this.showValidationButton.bind(this))
    })
  }

  fetchServices() {
    this.serviceService.findAll().subscribe((services: any) => {
      this.serviceList = services.data;
      if (this.serviceList) {
        this.filteredServiceList = this.serviceList;
      }
    })
  }

  handleFileUploadError (responseText: string) {
    const errorResponse: DataDto<any> = JSON.parse(responseText);
    return new Error(errorResponse.error?.message);
  }

  handleFileUploadSuccess(responseText: string) {
    const successResponse: DataDto<{url: string}> = JSON.parse(responseText);
    return successResponse.data;
  }

  onChangeImage() {
    this.imageUrls = [];
  }

  showValidationButton() {
    if (this.currentId) {
      this.displayUploaderValidateButton(true);
      this.onChangeImage();
    }
  }
  displayUploaderValidateButton(display: boolean) {
    const classList = document.querySelector("button.uppy-u-reset.uppy-c-btn")?.classList
    if (classList) {
      const displayFn = display ? classList.remove : classList.add;
      displayFn.call(classList, "d-none");
    }
  }

  filterServices() {
    const filterValue = this.serviceFilter.value;
    this.filteredServiceList = this.serviceList?.filter((service: ServiceDTO) => {
      return service.name.toLowerCase().includes(filterValue.toLowerCase());
    }) || [];
  }

  addServiceToList() {
    if (this.selectedService.value) {
      const selected =this.selectedService.value;
      selected.discount = 0;
      this.selectedServices = [...this.selectedServices,this.selectedService.value];
      this.selectedService.setValue(undefined);
      if (this.serviceListComponent) {
        this.serviceListComponent.data = this.selectedServices;
      }
    }
  }

  protected readonly console = console;
}
