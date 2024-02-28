import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {clearUser} from "../../store/user/user.action";
import {clearNotification} from "../../store/notification/notification.action";
import {WsClientService} from "../../services/notification/ws-client.service";

@Component({
  selector: 'app-deconnect',
  templateUrl: './deconnect.component.html',
  styleUrls: ['./deconnect.component.css']
})
export class DeconnectComponent {

  constructor(
    private store: Store<Store>,
    private router: Router,
    private ws: WsClientService
  ) {
    this.store.dispatch(clearUser());
    this.store.dispatch(clearNotification());
    this.ws.unsubscribe();
    this.router.navigate(["/"]);
  }

}
