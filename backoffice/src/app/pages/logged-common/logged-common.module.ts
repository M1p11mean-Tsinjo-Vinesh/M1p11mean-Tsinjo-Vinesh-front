import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedCommonRoutingModule } from './logged-common-routing.module';
import { NotificationListComponent } from './notification-list/notification-list.component';


@NgModule({
  declarations: [
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    LoggedCommonRoutingModule
  ]
})
export class LoggedCommonModule { }
