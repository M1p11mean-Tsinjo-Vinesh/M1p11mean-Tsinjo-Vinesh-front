import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../../services/notification/notification.service";
import {startApiCall} from "@common-components/services/sweet-alert.util";
import {DataDto} from "../../../dto/data.dto";
import {ObserverElt} from "@common-components/services/util";
import {NotificationProps} from "@common-components/notification/notification.component";
import {Router} from "@angular/router";
import {firstValueFrom} from "rxjs";
import {Store} from "@ngrx/store";
import AppStore from "../../../store/Appstore";
import {setNotification} from "../../../store/notification/notification.action";


@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {

  notifications?: NotificationProps[];
  notificationCount: number = 0;

  constructor(
    private router: Router,
    private store: Store<AppStore>,
    private service: NotificationService) {
  }

  ngOnInit(): void {
    this.store.subscribe(appStore => {
      this.notificationCount = appStore.notification.count;
    })
    // load notifications
    startApiCall(async close => {
      this.service.findAll<DataDto<NotificationProps[]>>().subscribe(ObserverElt((notifications: NotificationProps[])=> {
        this.notifications = notifications;
        close();
      }))
    })
  }

  async onNotificationClick(notification: NotificationProps) {
    await this.router.navigateByUrl(notification.redirectUrl);
    if (!notification.seen) {
      await firstValueFrom(this.service.markSeen(notification._id));
      this.store.dispatch(setNotification({
        count: this.notificationCount - 1
      }))
    }
  }

}
