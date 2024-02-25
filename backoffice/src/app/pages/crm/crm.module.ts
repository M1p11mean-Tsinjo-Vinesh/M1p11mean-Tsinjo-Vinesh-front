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
  ]
})
export class CrmModule { }
