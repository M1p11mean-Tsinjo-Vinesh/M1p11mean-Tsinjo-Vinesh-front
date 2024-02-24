import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedCommonRoutingModule } from './logged-common-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';
import {CommonComponentsModule} from "@common-components/common-components.module";


@NgModule({
  declarations: [
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    LoggedCommonRoutingModule,
    CommonComponentsModule
  ]
})
export class LoggedCommonModule { }
