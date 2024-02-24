import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from './service-card/service-card.component';
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    ServiceCardComponent
  ],
  exports: [
    ServiceCardComponent
  ],
  imports: [
    CommonModule,
    NgbCarousel,
    NgbSlide
  ]
})
export class CommonComponentsModule { }
