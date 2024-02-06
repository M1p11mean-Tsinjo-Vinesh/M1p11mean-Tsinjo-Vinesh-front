import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { EmployeeCrudComponent } from './employee-crud.component';
import {CommonComponentsModule} from "@common-components/common-components.module";


@NgModule({
  declarations: [
    EmployeeCrudComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommonComponentsModule
  ]
})
export class AdminModule { }
