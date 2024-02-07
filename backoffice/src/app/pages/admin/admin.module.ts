import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EmployeeCrudComponent } from './employee-crud.component';
import {CommonComponentsModule} from "@common-components/common-components.module";
import { ServiceFormComponent } from './service/service-form/service-form.component';
import {UppyAngularDashboardModule} from "@uppy/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {CardBodyComponent, CardComponent, CardHeaderComponent} from "@coreui/angular";
import {FullCalendarModule} from "@fullcalendar/angular";
import { ServiceListComponent } from './service/service-list.component';


@NgModule({
  declarations: [
    EmployeeCrudComponent,
    ServiceFormComponent,
    ServiceListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommonComponentsModule,
    UppyAngularDashboardModule,
    ReactiveFormsModule,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    FullCalendarModule
  ]
})
export class AdminModule { }
