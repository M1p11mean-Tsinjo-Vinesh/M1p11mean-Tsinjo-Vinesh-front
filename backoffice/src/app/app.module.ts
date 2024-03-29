import {LOCALE_ID, NgModule} from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  HashLocationStrategy,
  LocationStrategy,
  registerLocaleData
} from '@angular/common';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgScrollbarModule} from 'ngx-scrollbar';

// Import routing module
import {AppRoutingModule} from './app-routing.module';

// Import app component
import {AppComponent} from './app.component';

// Import containers
import {DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent} from './containers';

import {
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  DropdownModule,
  FooterModule,
  GridModule,
  HeaderModule,
  NavModule,
  SidebarModule
} from '@coreui/angular';

import {IconModule, IconSetService} from '@coreui/icons-angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {paginatorConfig} from "./paginator.config";
import {MatDialogModule} from "@angular/material/dialog";
import {CommonComponentsModule} from "@common-components/common-components.module";
import {CrmModule} from "./pages/crm/crm.module";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {userReducer} from "./store/user/user.reducer";
import {StoreModule} from "@ngrx/store";
import {BearerSetterInterceptor} from "./interceptor/bearer-setter.interceptor";
import {FullCalendarModule} from "@fullcalendar/angular";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {MatSelectModule} from "@angular/material/select";
import localeFr from '@angular/common/locales/fr';
import {notificationReducer} from "./store/notification/notification.reducer";
import {DurationPipe} from "./pipe/Duration.pipe";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {AppointmentStatusPipe} from "./pipe/AppointmentStatus.pipe";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
registerLocaleData(localeFr);

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      user: userReducer,
      notification: notificationReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    BadgeModule,
    NgScrollbarModule,
    ButtonModule,
    HttpClientModule,

    // custom
    CommonComponentsModule,
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    MatDialogModule,
    FullCalendarModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    {
      provide: MatPaginatorIntl,
      useValue: paginatorConfig()
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerSetterInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
    IconSetService,
    Title,
    DatePipe,
    DecimalPipe,
    CurrencyPipe,
    DurationPipe,
    AppointmentStatusPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
