import {LOCALE_ID, NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {LoginComponent} from "./pages/login/login.component";
import {AppointmentsComponent} from "./pages/appointments/appointments.component";
import {BrowserModule} from "@angular/platform-browser";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {userReducer} from "./store/user/user.reducer";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app.routing";
import {HomeModule} from "./pages/home/home.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {AppointmentStatusPipe} from "./pipe/AppointmentStatus.pipe";
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import {DurationPipe} from "./pipe/Duration.pipe";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatExpansionModule} from "@angular/material/expansion";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MakeAppointmentComponent } from './pages/make-appointment/make-appointment.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {FullCalendarModule} from "@fullcalendar/angular";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import { HeaderLinkComponent } from './shared/navbar/header-link/header-link.component';
import { AppUserComponent } from './shared/navbar/app-user/app-user.component';
import { LogoComponent } from './shared/navbar/logo/logo.component';
import { AppointmentDetailsComponent } from './pages/appointment-details/appointment-details.component';
import {StarRatingModule} from "angular-star-rating";
import {servicesReducer} from "./store/services/services.reducer";

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    AppointmentsComponent,
    MakeAppointmentComponent,
    AppointmentDetailsComponent,
    MakeAppointmentComponent,
    HeaderLinkComponent,
    AppUserComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      user: userReducer,
      services: servicesReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    StarRatingModule.forRoot(),
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatTableModule,
    AppointmentStatusPipe,
    DurationPipe,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    FullCalendarModule,
    MatSelectModule,
    NgxMatSelectSearchModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "fr-FR" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
