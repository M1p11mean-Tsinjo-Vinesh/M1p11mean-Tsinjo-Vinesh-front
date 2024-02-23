import { Injectable } from '@angular/core';
import {ReadService} from "../base-crud";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../../config/server.config";
import {DataDto} from "../../dto/data.dto";

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends ReadService {

  constructor(private http: HttpClient) {
    super("notifications", http);
  }

  countNotSeen() {
    return this.http.get<DataDto<number>>(baseUrl("notifications/count/not-seen"));
  }

  markSeen(notificationId: string) {
    return this.http.put(baseUrl(`notifications/${notificationId}/seen`), {});
  }

}
