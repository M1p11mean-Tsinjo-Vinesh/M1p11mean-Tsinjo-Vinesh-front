import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeCrudComponent} from "./employee-crud.component";
import {ServiceFormComponent} from "./service/service-form/service-form.component";
import {ServiceListComponent} from "./service/service-list.component";
import {OfferFormComponent} from "./offer/offer-form/offer-form.component";
import {ExpenseComponent} from "./expense.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AppointmentListComponent} from "./appointment/appointment-list.component";
import {AppointmentDetailsComponent} from "./appointment-details/appointment-details.component";
import {EditProfileComponent} from "../crm/edit-profile/edit-profile.component";
import {EmployeeFormComponent} from "./employee/employee-form/employee-form.component";
import {OfferListComponent} from "./offer/offer-list.component";

const routes: Routes = [
  {
    path: "employee",
    component: EmployeeCrudComponent,
    pathMatch: "full"
  },
  {
    path: "employee/ajout",
    component: EmployeeFormComponent,
    pathMatch: "full"
  },
  {
    path: "employee/:id",
    component: EmployeeFormComponent,
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
    path: "offre/liste",
    component: OfferListComponent,
    pathMatch: "full"
  },
  {
    path: "offre/modification/:id",
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
  },
  {
    path: "rendez-vous/liste",
    component: AppointmentListComponent,
    pathMatch: "full"
  },
  {
    path: "rendez-vous/details/:id",
    component: AppointmentDetailsComponent,
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
