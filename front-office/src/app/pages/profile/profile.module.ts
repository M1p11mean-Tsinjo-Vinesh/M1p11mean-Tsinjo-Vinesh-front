import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from "./profile.component";
import {ProfileLinkComponent} from './profile-link/profile-link.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import { ServicePreferencesComponent } from './service-preferences/service-preferences.component';
import { EmployeePreferencesComponent } from './employee-preferences/employee-preferences.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonComponentsModule} from "../../../components/common-components/common-components.module";


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileLinkComponent,
    EditProfileComponent,
    ServicePreferencesComponent,
    EmployeePreferencesComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    CommonComponentsModule
  ]
})
export class ProfileModule { }
