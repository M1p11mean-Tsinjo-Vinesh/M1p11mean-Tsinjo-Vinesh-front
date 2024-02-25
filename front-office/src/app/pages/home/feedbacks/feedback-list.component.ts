import {Component, OnInit} from '@angular/core';
import {FeedbackService} from "../../../services/feedback/feedback.service";
import {FeedbackProps} from "../../../../components/common-components/feedback/feedback.component";

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {

  feedbacks : FeedbackProps[] = [];

  constructor(private service: FeedbackService) {
  }


  ngOnInit() {
    this.service.findFeedBacks().subscribe(list => {
      this.feedbacks = list;
    })
  }


}
