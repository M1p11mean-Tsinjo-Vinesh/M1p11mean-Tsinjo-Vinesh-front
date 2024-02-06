import {Injectable, OnInit} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Store} from "@ngrx/store";
import AppStore from "../store/Appstore";

@Injectable()
export class BearerSetterInterceptor implements HttpInterceptor {

  tokenValue!: string;

  constructor(private store: Store<AppStore>) {
    this.store.pipe().subscribe((appStore: AppStore) => {
      console.log(appStore);
      this.tokenValue = appStore.user.token;
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = request.headers.set("Authorization", `Bearer ${this.tokenValue}`);
    return next.handle(request.clone({headers: headers}));
  }

}
