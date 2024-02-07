import {Component, OnInit} from '@angular/core';
import {Uppy} from '@uppy/core';
// ignore module non existant for uppy locale
// @ts-ignore
import French from '@uppy/locales/lib/fr_FR.js';

import XHR from '@uppy/xhr-upload';
import {baseUrl} from "../../../../../config/server.config";
import {Store} from "@ngrx/store";
import AppStore from "../../../../store/Appstore";
import {DataDto} from "../../../../dto/data.dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {

  uppy!: Uppy;
  form!: FormGroup;

  constructor(
    private store: Store<AppStore>,
    private formBuilder: FormBuilder
    ) {
  }

  ngOnInit() {
    this.initUppyUploader();
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      duration: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]],
      commission: [0, [Validators.required, Validators.min(1), Validators.max(100)]]
    })
  }

  initUppyUploader() {
    this.store.pipe().subscribe((appStore: AppStore) => {
      this.uppy = new Uppy({
        debug: true,
        autoProceed: true,
        locale: French,
        restrictions : {
          maxNumberOfFiles: 1,
          maxTotalFileSize: 2000000,
          allowedFileTypes: [".jpg", ".png", ".jpeg"]
        }
      }).use(XHR, {
        endpoint: baseUrl("upload/image"),
        method: "POST",
        formData: true,
        fieldName: "image",
        getResponseData: this.handleFileUploadSuccess.bind(this),
        getResponseError: this.handleFileUploadError.bind(this),
        headers: {
          Authorization: `Bearer ${appStore.user.token}`
        }
      });
    })
  }

  handleFileUploadError (responseText: string, xhr: any) {
    const errorResponse: DataDto<any> = JSON.parse(responseText);
    return new Error(errorResponse.error?.message);
  }

  handleFileUploadSuccess(responseText: string, response: unknown) {
    const successResponse: DataDto<{url: string}> = JSON.parse(responseText);
    return successResponse.data;
  }


}
