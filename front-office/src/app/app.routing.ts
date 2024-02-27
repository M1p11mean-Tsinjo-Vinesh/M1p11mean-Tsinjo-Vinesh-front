import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {SignupComponent} from './pages/signup/signup.component';
import {LoginComponent} from './pages/login/login.component';
import {AppointmentsComponent} from "./pages/appointments/appointments.component";
import {MakeAppointmentComponent} from "./pages/make-appointment/make-appointment.component";
import {AppointmentDetailsComponent} from "./pages/appointment-details/appointment-details.component";
import {EditProfileComponent} from "./pages/profile/edit-profile/edit-profile.component";
import {ServicePreferencesComponent} from "./pages/profile/service-preferences/service-preferences.component";
import {EmployeePreferencesComponent} from "./pages/profile/employee-preferences/employee-preferences.component";

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    {
      path: 'profile',
      component: ProfileComponent,
      children: [
        {
          path: 'edit',
          component: EditProfileComponent
        },
        {
          path: 'favoris',
          children: [
            {
              path: 'services',
              component: ServicePreferencesComponent
            },
            {
              path: 'employees',
              component: EmployeePreferencesComponent
            }
          ]
        }
      ]
    },
    { path: 'register',           component: SignupComponent },
    { path: 'login',          component: LoginComponent },
    { path: 'user-appointments', component: AppointmentsComponent},
    { path: 'user-appointments/:id', component: AppointmentDetailsComponent},
    { path: 'make-appointment', component: MakeAppointmentComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
