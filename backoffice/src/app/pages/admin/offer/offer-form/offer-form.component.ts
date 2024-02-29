import {Component, ViewChild} from '@angular/core';
import {
  FormActionProps,
  InputList,
} from "@common-components/interfaces";
import {FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Navigation, Router} from "@angular/router";
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
import {DecimalPipe, formatNumber} from "@angular/common";
import {firstValueFrom, Observable, Subject, takeUntil} from "rxjs";
import {ListComponent} from "@common-components/list/list.component";
import {DomSanitizer} from "@angular/platform-browser";
import {MatTableDataSource} from "@angular/material/table";
import {showSuccess, startApiCall} from "@common-components/services/sweet-alert.util";
import {ObserverObject} from "@common-components/services/util";
import {isAfter, isBefore} from "date-fns"

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrls: [
    './offer-form.component.scss',
  ]
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
      type: "textarea",
      validators: Validators.required
    },
    startDate: {
      label: "Date de debut",
      type: "date",
      validators: Validators.required
    },
    endDate: {
      label: "Date de fin",
      type: "date",
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
  excludedServiceList: string[] = [];
  serviceFilter: FormControl = new FormControl("");
  _onDestroy = new Subject<void>();

  selectedService = new FormControl<ServiceDTO| undefined>(undefined);

  serviceListHeaders: string[] = ["Nom", "Prix initial (Ar)", "Reduction", "Prix après réduction (Ar)","Action"];

  selectedServices: ServiceDTO[] = [];
  selectedServicesDataSource: MatTableDataSource<ServiceDTO> = new MatTableDataSource<ServiceDTO>();

  offerService: ICRUDService;

  protected readonly formatNumber = formatNumber;
  protected readonly isNaN = isNaN;

  constructor(
    private decimalPipe: DecimalPipe,
    private store: Store<AppStore>,
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) {
    this.serviceService = new CrudService("services", this.http);
    this.offerService = new CrudService("offers", http);
    const id = this.activatedRoute.snapshot.params["id"];
    const navigation = this.router.getCurrentNavigation();
    if (id) {
      this.currentId = id
      this.setUpdateMode(navigation);
    }
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
      this.serviceList = services.data.filter((element: any) => {
       return element.discountInformation === undefined;
      });
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
      return service.name.toLowerCase().includes(filterValue.toLowerCase()) && !this.excludedServiceList.includes(service._id)
    }) || [];
  }

  addServiceToList() {
    if (this.selectedService.value) {
      const selected =this.selectedService.value;
      this.excludedServiceList.push(selected?._id);
      selected.discount = 0;
      this.selectedServices = [...this.selectedServices,this.selectedService.value];
      this.selectedServicesDataSource.data = this.selectedServices;
      this.selectedService.setValue(undefined);
    }
  }

  updateDiscount(_id: string, event: Event) {
    const target = event.target as HTMLInputElement;
    let newDiscount = parseInt(target.value);
    // discount must be between 0 and 100
    if (isNaN(newDiscount) || newDiscount < 0) {
      target.value = "0";
      newDiscount = 0;
    } else if (newDiscount > 100) {
      target.value = "100";
      newDiscount = 100;
    }
    const discount = newDiscount / 100;
    const service = this.selectedServices.find((service: ServiceDTO) => service._id === _id);
    if (service) {
      service.discount = discount;
      this.selectedServicesDataSource.data = this.selectedServices;
    }
  }

  getTotalPrice() {
    return this.selectedServices.reduce((acc, service) => acc + service.price * (1 - (service.discount ?? 0)), 0);
  }

  removeService(_id: string) {
    this.selectedServices = this.selectedServices.filter((service: ServiceDTO) => service._id !== _id);
    this.selectedServicesDataSource.data = this.selectedServices;
    this.excludedServiceList = this.excludedServiceList.filter((id: string) => id !== _id);
    this.filterServices()
  }

  apiCallFunctionOnSubmit(data: any) {
    if (this.imageUrls.length == 0) {
      // simulate http error for util fn
      return this.onEmptyImages();
    }
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    if (isAfter(startDate,endDate)) {
      return this.onWrongDate();
    }
    const now = new Date();
    if (isBefore(startDate, now) && isBefore(endDate,now)) {
      return this.onPastDate();
    }
    const body = {
      ...data,
      services: this.selectedServices,
      pictureUrls: this.imageUrls,
    }
    if(this.currentId) {
      body._id = this.currentId;
      return this.offerService.update(body);
    }
    return this.offerService.create(body);
  }

  onEmptyImages() {
    const errorFunction = () => {
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
    }
    return new Observable(errorFunction)
  }

  onWrongDate() {
    const errorFunction = () => {
      const error = new Error() as any;
      error.message = "La date de fin doit être supérieure à la date de début";
      error.status = 400;
      error.error = {
        error: {
          code: 400,
          message: error.message
        }
      }
      throw error;
    }
    return new Observable(errorFunction)
  }

  onPastDate() {
    const errorFunction = () => {
      const error = new Error() as any;
      error.message = "La date de début ou de fin doit être supérieure à la date actuelle";
      error.status = 400;
      error.error = {
        error: {
          code: 400,
          message: error.message
        }
      }
      throw error;
    }
    return new Observable(errorFunction)
  }

  onApiCallSuccess() {
    showSuccess(async () => {
      await this.router.navigate(["management", "offre", "liste"]);
    }, "Enregistré avec succès");
  }
  setUpdateMode(navigation: Navigation | null) {
    this.title = "Modification d'une offre";
    startApiCall(async (close) => {
      await this.findServiceToUpdate(navigation);
      close();
    });
  }

  async findServiceToUpdate(navigation: Navigation | null){
    if (!this.currentId) return;
    try {
      let service: any = await this.findService(navigation);
      const {pictureUrls, ...rest} = service;
      rest.startDate = rest.startDate ? rest.startDate.split("T")[0] : "";
      rest.endDate = rest.endDate ? rest.endDate.split("T")[0] : "";
      this.formDefaultValue = rest;
      this.selectedServices = rest.services;
      for (const service of this.selectedServices) {
        this.excludedServiceList.push(service._id);
      }
      this.filterServices()
      this.selectedServicesDataSource.data = this.selectedServices;
      this.imageUrls = await this.loadImagesIntoUploader(pictureUrls);
      // hide  validate button on update form first load
      this.displayUploaderValidateButton(false);
    }
    catch (e) {
      new Observable(() => {
        throw e
      }).subscribe(ObserverObject());
    }
  }

  async findService(navigation: Navigation | null) {
    if (!this.currentId) throw new Error("update mode is not set");
    let service = navigation?.extras.state;
    if (service) return service;
    // find service from API if it was not passed through the url state.
    const response = await firstValueFrom(this.offerService.findById<DataDto<any>>(this.currentId));
    return response.data;
  }

  async loadImagesIntoUploader(images: string[]): Promise<string[]> {
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
}
