import {Component, Input} from '@angular/core';

export interface NotificationProps {
  _id: string
  pictureUrl: string
  title: string
  description: string
  redirectUrl: string
  date: Date
  userId: string,
  seen?: boolean
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  @Input({
    required: true
  })
  notification!: NotificationProps;
}
