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
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {AppointmentStatusPipe} from "../../pipe/AppointmentStatus.pipe";
import {DurationPipe} from "../../pipe/Duration.pipe";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileLinkComponent,
    EditProfileComponent,
    ServicePreferencesComponent,
    EmployeePreferencesComponent,
    AppointmentHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    CommonComponentsModule,
    MatExpansionModule,
    AppointmentStatusPipe,
    DurationPipe,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
  ]
})
export class ProfileModule { }
