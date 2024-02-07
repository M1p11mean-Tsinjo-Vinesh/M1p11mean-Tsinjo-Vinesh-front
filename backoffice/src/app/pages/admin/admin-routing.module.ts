import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeCrudComponent} from "./employee-crud.component";
import {ServiceFormComponent} from "./service/service-form/service-form.component";
import {ServiceListComponent} from "./service/service-list.component";

const routes: Routes = [
  {
    path: "employee",
    component: EmployeeCrudComponent,
    pathMatch: "full"
  },
  {
    path: "service/ajout",
    component: ServiceFormComponent,
    pathMatch: "full"
  },
  {
    path: "service/liste",
    component: ServiceListComponent,
    pathMatch: "full"
  },
  {
	  path: "service/modification/:id",
	  component: ServiceFormComponent,
	  pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
