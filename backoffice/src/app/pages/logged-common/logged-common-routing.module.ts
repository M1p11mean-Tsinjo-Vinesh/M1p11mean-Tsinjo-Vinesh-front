import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotificationListComponent} from "./notification-list/notification-list.component";

const routes: Routes = [
  {
    path: 'notifications',
    component: NotificationListComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedCommonRoutingModule { }
