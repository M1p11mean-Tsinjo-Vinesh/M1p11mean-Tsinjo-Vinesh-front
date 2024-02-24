import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from './service-card/service-card.component';
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";
import { TeamMemberCardComponent } from './team-member-card/team-member-card.component';



@NgModule({
  declarations: [
    ServiceCardComponent,
    TeamMemberCardComponent
  ],
  exports: [
    ServiceCardComponent,
    TeamMemberCardComponent
  ],
  imports: [
    CommonModule,
    NgbCarousel,
    NgbSlide
  ]
})
export class CommonComponentsModule { }
