import { Injectable } from '@angular/core';
import {ReadService} from "../base-crud";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends ReadService {

  constructor(private http: HttpClient) {
    super("notifications", http);
  }

}
