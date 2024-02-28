import {Injectable} from '@angular/core';
import {wsUrl} from "../../../config/server.config";
import {Store} from "@ngrx/store";
import AppStore from "../../store/Appstore";
import {Subject} from "rxjs";
import {NotificationService} from "./notification.service";
import {setNotification} from "../../store/notification/notification.action";

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

@Injectable({
  providedIn: 'root'
})
export class WsClientService {

  private webSocket?: WebSocket;
  private token!: string;
  private subject = new Subject<NotificationProps>();
  private permission: string = "granted";
  private notificationCount = 0;

  constructor(
    private notificationService: NotificationService,
    private store: Store<AppStore>) {
    this.store.subscribe(appstore => {
      if (!this.webSocket) {
        this.token = appstore.user.token;
        this.webSocket = new WebSocket(wsUrl + "?token=" + this.token);
        this.webSocket.onmessage = (ev) => {
          const notification = JSON.parse(ev.data);
          this.next(notification);
        };
      }
    })
    this.notificationService.countNotSeen().subscribe(response => {
      this.notificationCount = response.data;
    })
  }

  private next(notification: NotificationProps) {
    this.subject.next(notification);
    if (typeof Notification != undefined) {
      if(this.permission === "denied") return;
      if(Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            this.permission = "granted";
            this.pushNotification(notification);
          }
        })
        return;
      }
      this.pushNotification(notification);
    }
    this.notificationCount++;
    this.store.dispatch(setNotification({count : this.notificationCount}));
  }

  private pushNotification(notification: NotificationProps) {
    const pushedNotification = new Notification(notification.title, {
      body: notification.description.trim(),
      icon: notification.pictureUrl
    })
    pushedNotification.onclick = () => {
      pushedNotification.close();
      window.parent.focus();
    }
  }


  register() {
    return this.subject.asObservable();
  }

}
