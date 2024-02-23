import {Component, Input, OnInit} from '@angular/core';

import {HeaderComponent} from '@coreui/angular';
import {User} from "@common-components/avatar/avatar.component";
import {Store} from "@ngrx/store";
import {AppNotification, setNotification} from "../../../store/notification/notification.action";
import {NotificationService} from "../../../services/notification/notification.service";
import AppStore from "../../../store/Appstore";
import {WsClientService} from "../../../services/notification/ws-client.service";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss']
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  user!: User;
  notificationCount: number = 0;

  constructor(
    private ws: WsClientService,
    private notificationService: NotificationService,
    private store: Store<AppStore>) {
    super();
  }

  ngOnInit() {
    this.user = {
      name: "Sinel Vinesh",
      path: "/assets/images/Vinesh.jpg "
    };
    this.ws.register().subscribe(notification => {
      this.dispatchNotificationCount(this.notificationCount + 1);
    })
    this.store.subscribe((appStore) => {
      this.notificationCount = appStore.notification.count;
    });
    this.notificationService.countNotSeen().subscribe(response => {
      this.dispatchNotificationCount(response.data ?? 0);
    })
  }

  dispatchNotificationCount(count: number) {
    this.store.dispatch(setNotification({
      count
    }))
  }


  logout(){
    window.location.href = "/#/login";
    //TODO: Logout
  }

  @Input() sidebarId: string = "sidebar";

}
