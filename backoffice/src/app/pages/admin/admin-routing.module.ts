import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeCrudComponent} from "./employee-crud.component";
import {ServiceFormComponent} from "./service/service-form/service-form.component";
import {ServiceListComponent} from "./service/service-list.component";
import {OfferFormComponent} from "./offer/offer-form/offer-form.component";
import {ExpenseComponent} from "./expense.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";

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
  },
  {
    path: "offre/ajout",
    component: OfferFormComponent,
    pathMatch: "full"
  },
  {
    path: "depense",
    component: ExpenseComponent,
    pathMatch: "full"
  },
  {
    path: "dashboard",
    component: AdminDashboardComponent,
    pathMatch: "full"
  },
  {
    path: "",
    component: AdminDashboardComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
