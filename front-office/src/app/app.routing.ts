import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import {AppointmentsComponent} from "./pages/appointments/appointments.component";
import {MakeAppointmentComponent} from "./pages/make-appointment/make-appointment.component";
import {AppointmentDetailsComponent} from "./pages/appointment-details/appointment-details.component";

const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'register',           component: SignupComponent },
    { path: 'landing',          component: LandingComponent },
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
