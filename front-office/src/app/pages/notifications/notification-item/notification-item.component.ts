import {Component, Input} from '@angular/core';
import {NotificationProps} from "../../../services/notification/ws-client.service";

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css']
})
export class NotificationItemComponent {
  @Input({
    required: true
  })
  notification!: NotificationProps;
}
