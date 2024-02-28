import {Component, OnInit} from '@angular/core';
import {faBell} from "@fortawesome/free-regular-svg-icons";
import {WsClientService} from "../../../services/notification/ws-client.service";
import {NotificationService} from "../../../services/notification/notification.service";
import {Store} from "@ngrx/store";
import AppStore from "../../../store/Appstore";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{

  protected readonly faBell = faBell;

  notificationCount: number = 0;

  constructor(
    private ws: WsClientService,
    private notificationService: NotificationService,
    private store: Store<AppStore>) {
  }

  ngOnInit() {
    this.store.subscribe((appStore) => {
      this.notificationCount = appStore.notification.count;
    });

  }

}
