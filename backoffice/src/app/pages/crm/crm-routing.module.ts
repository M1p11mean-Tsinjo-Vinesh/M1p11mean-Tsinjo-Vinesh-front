import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./user.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";

const routes: Routes = [
  {
    path: "users",
    component: UserComponent,
    pathMatch: "full"
  },
  {
    path: "edit-profile",
    component: EditProfileComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }
