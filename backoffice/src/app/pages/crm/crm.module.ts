import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmRoutingModule } from './crm-routing.module';
import { UserComponent } from './user.component';
import {CommonComponentsModule} from "@common-components/common-components.module";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  HeaderComponent, ModalBodyComponent,
  ModalComponent, ModalFooterComponent,
  ModalHeaderComponent
} from "@coreui/angular";
import {FullCalendarModule} from "@fullcalendar/angular";
import { PlanningComponent } from './planning/planning/planning.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserComponent,
    EditProfileComponent,
    PlanningComponent,
    TasklistComponent,
    EmployeeHomeComponent
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    // custom
    CommonComponentsModule,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    HeaderComponent,
    FullCalendarModule,
    ModalComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    ButtonDirective,
    MatTableModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ]
})
export class CrmModule { }
