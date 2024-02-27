import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./user.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {PlanningComponent} from "./planning/planning/planning.component";
import {EmployeeHomeComponent} from "./employee-home/employee-home.component";
import {employeeGuard} from "../../guard/employee.guard";

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
  },
  {
    path: "planning",
    component: PlanningComponent
  },
  {
    path: "",
    component: EmployeeHomeComponent,
    canActivate: [employeeGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }
