import {NgModule} from '@angular/core';
import {CurrencyPipe, DatePipe, DecimalPipe, HashLocationStrategy, LocationStrategy} from '@angular/common';
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
      user: userReducer
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
    FullCalendarModule
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
    IconSetService,
    Title,
    DatePipe,
    DecimalPipe,
    CurrencyPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
