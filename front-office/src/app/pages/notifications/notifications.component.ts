import {Component} from '@angular/core';
import {NotificationProps} from "../../services/notification/ws-client.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import AppStore from "../../store/Appstore";
import {NotificationService} from "../../services/notification/notification.service";
import {startApiCall} from "../../services/sweet-alert.util";
import {DataDto} from "../../data/dto/data.dto";
import {ObserverElt} from "../../services/util";
import {firstValueFrom} from "rxjs";
import {setNotification} from "../../store/notification/notification.action";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

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
    });
    window.scroll(0, 0);
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
