import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./user.component";

const routes: Routes = [
  {
    path: "users",
    component: UserComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }
