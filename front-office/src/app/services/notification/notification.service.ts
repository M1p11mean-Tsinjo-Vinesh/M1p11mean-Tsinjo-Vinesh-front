import {Injectable} from '@angular/core';
import {ReadService} from "../base-crud";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../../config/server.config";
import {Observable} from "rxjs";
import {DataDto} from "../../data/dto/data.dto";

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends ReadService {

  constructor(private http: HttpClient) {
    super("notifications", http);
  }

  override findAll<T>(): Observable<T> {
    return this._http.get<T>(baseUrl(`${this.commonURL}/get/all`), {
      params: {
        column: "date",
        method: -1
      }
    });
  }

  countNotSeen() {
    return this.http.get<DataDto<number>>(baseUrl("notifications/count/not-seen"));
  }

  markSeen(notificationId: string) {
    return this.http.put(baseUrl(`notifications/${notificationId}/seen`), {});
  }

}
