import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EmployeeCrudComponent } from './employee-crud.component';
import {CommonComponentsModule} from "@common-components/common-components.module";
import { ServiceFormComponent } from './service/service-form/service-form.component';
import {UppyAngularDashboardModule} from "@uppy/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {AlertComponent, CardBodyComponent, CardComponent, CardHeaderComponent} from "@coreui/angular";
import {FullCalendarModule} from "@fullcalendar/angular";
import { ServiceListComponent } from './service/service-list.component';
import {MatIconModule} from "@angular/material/icon";
import {OfferFormComponent} from "./offer/offer-form/offer-form.component";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import { ExpenseComponent } from './expense.component';


@NgModule({
  declarations: [
    EmployeeCrudComponent,
    ServiceFormComponent,
    ServiceListComponent,
    OfferFormComponent,
    ExpenseComponent
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
    FullCalendarModule,
    AlertComponent,
    MatIconModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule
  ]
})
export class AdminModule { }
