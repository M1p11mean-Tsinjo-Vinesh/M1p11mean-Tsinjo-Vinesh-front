import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmRoutingModule } from './crm-routing.module';
import { UserComponent } from './user.component';
import {CommonComponentsModule} from "@common-components/common-components.module";


@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    // custom
    CommonComponentsModule,
  ]
})
export class CrmModule { }
