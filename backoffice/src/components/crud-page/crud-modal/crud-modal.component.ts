import {Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormComponent} from "../../form/form.component";
import {CRUDModalData} from "../../interfaces";

@Component({
  selector: 'app-crud-modal',
  templateUrl: './crud-modal.component.html',
  styleUrls: ['../../modal.component.scss']
})
export class CrudModalComponent {

  data: CRUDModalData;
  inputClass: string = "col-md-12 mt-2 mb-0";
  @ViewChild("modalForm") modalForm !: FormComponent;

  constructor(@Inject(MAT_DIALOG_DATA) data: CRUDModalData, private ref: MatDialogRef<CrudModalComponent>) {
    this.data = data;
    this.inputClass = data.inputClass || this.inputClass;
    this.ref.disableClose = true;
  }

  reinitialize () {
    this.data.value = (this.data.init && {...this.data.init}) || {reset: true};
  }

  success = (data: any) => {
    this.ref.close(data);
  }

  validate () {
    const form = this.modalForm.form;
    if (this.data.method) {
      this.modalForm.validate(undefined, true);
      return;
    }
    if (form.valid) {
      this.ref.close(form.value);
    }
  }
}
