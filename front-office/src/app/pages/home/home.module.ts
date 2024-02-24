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

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        SectionsModule, NgbModule
    ],
    declarations: [ HomeComponent, HpBannerComponent, ServiceListComponent ],
    exports:[ HomeComponent ],
    providers: []
})
export class HomeModule { }
