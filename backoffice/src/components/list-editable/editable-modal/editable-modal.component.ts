import {Component, Inject, ViewChild} from '@angular/core';
import {EditableData} from "../interfaces";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormComponent} from "../../form/form.component";

@Component({
  selector: 'app-editable-modal',
  templateUrl: './editable-modal.component.html',
  styleUrls: ['./editable-modal.component.scss']
})
export class EditableModalComponent {

  data : EditableData;
  default: any;

  @ViewChild("editableForm") form !: FormComponent;

  constructor(
    private ref: MatDialogRef<EditableModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: EditableData
  ) {
    this.data = data;
    this.default = data.default;
  }

  reinitialize () {
    this.default = {...this.data.default};
  }


  validate () {
    this.form.validate(data => this.ref.close(data), true);
  }


}
