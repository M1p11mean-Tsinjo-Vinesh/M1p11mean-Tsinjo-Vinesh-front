import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';

import {HomeComponent} from './home.component';

import {SectionsModule} from '../../sections/sections.module';
import { HpBannerComponent } from './hp-banner/hp-banner.component';
import { ServiceListComponent } from './service-list/service-list.component';
import {CommonComponentsModule} from "../../../components/common-components/common-components.module";
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    SectionsModule, NgbModule, CommonComponentsModule
  ],
    declarations: [ HomeComponent, HpBannerComponent, ServiceListComponent, AboutUsComponent ],
    exports:[ HomeComponent ],
    providers: []
})
export class HomeModule { }
