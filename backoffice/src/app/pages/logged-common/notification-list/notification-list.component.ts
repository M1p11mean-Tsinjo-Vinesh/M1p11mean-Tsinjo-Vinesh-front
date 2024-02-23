import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../services/notification/notification.service";
import {startApiCall} from "@common-components/services/sweet-alert.util";
import {DataDto} from "../../../dto/data.dto";
import {ObserverElt} from "@common-components/services/util";
import {Notification} from "@common-components/notification/notification.component";


@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  notifications?: Notification[];

  constructor(private service: NotificationService) {
  }

  ngOnInit(): void {
    startApiCall(async close => {
      this.service.findAll<DataDto<Notification[]>>().subscribe(ObserverElt((notifications: Notification[])=> {
        this.notifications = notifications;
        console.log(this.notifications);
        close();
      }))
    })
  }

}
