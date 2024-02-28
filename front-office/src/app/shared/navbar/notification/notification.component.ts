import { Component } from '@angular/core';
import {faBell} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  protected readonly faBell = faBell;
}
