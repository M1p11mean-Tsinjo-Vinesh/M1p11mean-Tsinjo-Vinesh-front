import {Injectable, OnInit} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Store} from "@ngrx/store";
import AppStore from "../store/Appstore";

@Injectable()
export class BearerSetterInterceptor implements HttpInterceptor, OnInit {

  tokenValue!: string;

  constructor(private store: Store<AppStore>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request.headers.set("Authorization", `Bearer ${this.tokenValue}`);
    return next.handle(request);
  }

  ngOnInit(): void {
    this.store.pipe().subscribe((appStore: AppStore) => {
      this.tokenValue = appStore.user.token;
    });
  }

}
