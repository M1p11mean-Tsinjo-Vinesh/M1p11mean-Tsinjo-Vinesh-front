import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {SignupComponent} from './pages/signup/signup.component';
import {LoginComponent} from './pages/login/login.component';
import {MakeAppointmentComponent} from "./pages/make-appointment/make-appointment.component";
import {AppointmentDetailsComponent} from "./pages/appointment-details/appointment-details.component";
import {EditProfileComponent} from "./pages/profile/edit-profile/edit-profile.component";
import {ServicePreferencesComponent} from "./pages/profile/service-preferences/service-preferences.component";
import {EmployeePreferencesComponent} from "./pages/profile/employee-preferences/employee-preferences.component";
import {AppointmentHistoryComponent} from "./pages/profile/appointment-history/appointment-history.component";
import {
  AppointmentPaymentComponent
} from "./pages/appointment-details/appointment-payment/appointment-payment.component";


const routes: Routes = [
  {
    path: "accueil",
    children: [
      {
        path: '',
        redirectTo: 'presentation'
      },
      {
        path: 'presentation',
        component: HomeComponent
      },
      {
        path: 'services',
        component: HomeComponent
      },
      {
        path: 'a-propos',
        component: HomeComponent
      },
      {
        path: 'rendez-vous',
        component: HomeComponent
      },
    ]
  },
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
        },
        {
          path: "historique-rendez-vous",
          component: AppointmentHistoryComponent
        }
      ]
    },
    { path: 'register',           component: SignupComponent,},
    { path: 'login',          component: LoginComponent },
    { path: 'user-appointments/:id', component: AppointmentDetailsComponent},
    { path: 'prendre-rendez-vous', component: MakeAppointmentComponent},
    { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  {
    path: "rendez-vous",
    children: [
      {
        path: "paiement",
        component: AppointmentPaymentComponent
      }
    ]
  }
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
