import {Component, Input} from '@angular/core';

export interface FeedbackProps {
  _id: string,
  stars: number,
  comment: string,
  userName: string,
  image: string
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  @Input({
    required: true
  }) feedback!: FeedbackProps;

}
