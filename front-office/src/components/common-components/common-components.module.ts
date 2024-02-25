import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceCardComponent} from './service-card/service-card.component';
import {NgbCarousel, NgbSlide} from "@ng-bootstrap/ng-bootstrap";
import {TeamMemberCardComponent} from './team-member-card/team-member-card.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {StarRatingModule} from "angular-star-rating";


@NgModule({
  declarations: [
    ServiceCardComponent,
    TeamMemberCardComponent,
    FeedbackComponent
  ],
  exports: [
    ServiceCardComponent,
    TeamMemberCardComponent,
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    NgbCarousel,
    NgbSlide,
    StarRatingModule
  ]
})
export class CommonComponentsModule { }
