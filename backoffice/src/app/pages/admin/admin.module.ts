import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EmployeeCrudComponent } from './employee-crud.component';
import {CommonComponentsModule} from "@common-components/common-components.module";
import { ServiceFormComponent } from './service/service-form/service-form.component';
import {UppyAngularDashboardModule} from "@uppy/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {
  AlertComponent, ButtonDirective, ButtonGroupComponent,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  FormSelectDirective, TemplateIdDirective, WidgetStatAComponent
} from "@coreui/angular";
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
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {ChartjsComponent} from "@coreui/angular-chartjs";
import {DurationPipe} from "../../pipe/Duration.pipe";
import { SalesChartComponent } from './admin-dashboard/sales-chart/sales-chart.component';
import { AppointmentCountChartComponent } from './admin-dashboard/appointment-count-chart/appointment-count-chart.component';
import { WorkingTimeComponent } from './admin-dashboard/working-time/working-time.component';
import { ProfitChartComponent } from './admin-dashboard/profit-chart/profit-chart.component';


@NgModule({
  declarations: [
    EmployeeCrudComponent,
    ServiceFormComponent,
    ServiceListComponent,
    OfferFormComponent,
    ExpenseComponent,
    AdminDashboardComponent,
    SalesChartComponent,
    AppointmentCountChartComponent,
    WorkingTimeComponent,
    ProfitChartComponent
  ],
  exports: [
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
    FullCalendarModule,
    AlertComponent,
    MatIconModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    ChartjsComponent,
    FormSelectDirective,
    ButtonGroupComponent,
    ButtonDirective,
    DurationPipe,
    WidgetStatAComponent,
    TemplateIdDirective
  ]
})
export class AdminModule { }
