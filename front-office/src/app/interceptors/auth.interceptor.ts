import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import AppStore from "../store/Appstore";
import {Store} from "@ngrx/store";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  tokenValue!: string;

  constructor(private store: Store<AppStore>) {
    this.store.pipe().subscribe((appStore: AppStore) => {
      this.tokenValue = appStore.user.token;
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = request.headers.set("Authorization", `Bearer ${this.tokenValue}`);
    return next.handle(request.clone({headers: headers}));
  }
}
