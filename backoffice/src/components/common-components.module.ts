import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppAvatarComponent} from './avatar/avatar.component';
import {
  AvatarComponent,
  ButtonModule,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ProgressBarComponent,
  ProgressComponent,
  RowComponent,
  TextColorDirective,
  ToastBodyComponent,
  ToastCloseDirective,
  ToastHeaderComponent
} from "@coreui/angular";
import {InputComponent} from './form/input/input.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListComponent} from './list/list.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {AutoCompleteComponent} from './form/auto-complete/auto-complete.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {InputCommon} from "./form/input-common.class";
import {RecursiveInputComponent} from './form/recursive-input/recursive-input.component';
import {FormComponent} from './form/form.component';
import {CrudPageComponent} from './crud-page/crud-page.component';
import {IconComponent} from "@coreui/icons-angular";
import {CrudButtonComponent} from './crud-page/crud-button/crud-button.component';
import {CrudModalComponent} from './crud-page/crud-modal/crud-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ImageUploaderComponent} from './image-uploader/image-uploader.component';
import {ImageCropperModule} from "ngx-image-cropper";
import {ModalCropperComponent} from './image-uploader/modal-croper/modal-cropper.component';
import {ImageInputComponent} from './form/image-input/image-input.component';
import {InfoDescriptionComponent} from './info-description/info-description.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ActionButtonsComponent} from './crud-page/action-buttons/action-buttons.component';
import {ListEditableComponent} from './list-editable/list-editable.component';
import {EditableModalComponent} from './list-editable/editable-modal/editable-modal.component';
import {ListCheckboxComponent} from './list-checkbox/list-checkbox.component';
import {CommonToastComponent} from './common-toast/common-toast.component';
import {CategoryBtnComponent} from './category-btn/category-btn.component';
import {PaginatedTableComponent} from "./paginated-table/paginated-table.component";
import {TableComponent} from "./table/table.component";
import {ButtonsComponent} from "./buttons/buttons.component";


@NgModule({
  declarations: [
    AppAvatarComponent,
    InputComponent,
    ListComponent,
    AutoCompleteComponent,
    InputCommon,
    RecursiveInputComponent,
    FormComponent,
    CrudPageComponent,
    CrudButtonComponent,
    CrudModalComponent,
    ImageUploaderComponent,
    ModalCropperComponent,
    ImageInputComponent,
    InfoDescriptionComponent,
    ActionButtonsComponent,
    ListEditableComponent,
    EditableModalComponent,
    ListCheckboxComponent,
    ButtonsComponent,
    CommonToastComponent,
    CategoryBtnComponent,
    PaginatedTableComponent,
    TableComponent
  ],
  exports: [
    AppAvatarComponent,
    InputComponent,
    AutoCompleteComponent,
    FormComponent,
    CrudPageComponent,
    ImageUploaderComponent,
    CrudButtonComponent,
    ListComponent,
    ImageInputComponent,
    InfoDescriptionComponent,
    ListEditableComponent,
    ListCheckboxComponent,
    ButtonsComponent,
    ActionButtonsComponent,
    RecursiveInputComponent,
    CategoryBtnComponent,
    PaginatedTableComponent
  ],

  imports: [
    CommonModule,
    AvatarComponent,
    TextColorDirective,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ButtonModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    IconComponent,
    MatDialogModule,
    RowComponent,
    MatPaginatorModule,
    ImageCropperModule,
    MatCheckboxModule,
    ToastHeaderComponent,
    ToastBodyComponent,
    ProgressBarComponent,
    ProgressComponent,
    ToastCloseDirective
  ]
})
export class CommonComponentsModule { }
