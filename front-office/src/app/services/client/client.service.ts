import { Injectable } from '@angular/core';
import {firstValueFrom, Observable, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../../config/server.config";
import {MailCheckDTO} from "../../dto/client.dto";
import {DataDto} from "../../dto/data.dto";
import {IClientService} from "./IClient.service";
import {AuthDto} from "../../dto/auth.dto";
import {Store} from "@ngrx/store";
import AppStore from "../../store/Appstore";
import {clearUser, setUser} from "../../store/user/user.action";
import {JwtDecoderService} from "../decoder/jwt-decoder.service";
import {UserDTO, UserSignUpDTO} from "../../dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class ClientService implements IClientService {
  constructor(private http: HttpClient, private store: Store<AppStore>, private jwtDecoder: JwtDecoderService) { }

  isMailAvailable(email: string): Observable<boolean> {
        return new Observable<boolean>(subscriber => {
            this.http.get(baseUrl('/clients/checkMail'), {
                params: {
                    email: email
                }
            }).subscribe((response: DataDto<MailCheckDTO>) => {
                subscriber.next(response.data.available);
                subscriber.complete();
            })
        });
  }

  login(email: string, password: string): Observable<DataDto<AuthDto>> {
    return new Observable<DataDto<AuthDto>>( subscriber => {
        this.http.post(baseUrl('/clients/login'), {
            email: email,
            password: password
        }).subscribe((response: DataDto<AuthDto>) => {
          const tokenData = this.jwtDecoder.decode(response.data.jwt);
          this.store.dispatch(setUser(tokenData));
          sessionStorage.setItem('user', JSON.stringify(tokenData));
          subscriber.next(response);
          subscriber.complete();
        });
    });
  }
  
  register(user: UserSignUpDTO): Observable<DataDto<AuthDto>> {
    return new Observable<DataDto<AuthDto>>( subscriber => {
        this.http.post(baseUrl('/clients/register'), user).subscribe((response: DataDto<AuthDto>) => {
          const tokenData = this.jwtDecoder.decode(response.data.jwt);
          this.store.dispatch(setUser(tokenData));
          sessionStorage.setItem('user', JSON.stringify(tokenData));
          subscriber.next(response);
          subscriber.complete();
        });
    });
  }
  
  logout(): Observable<null> {
    return new Observable(subscriber => {
      this.store.dispatch(clearUser());
      sessionStorage.removeItem('user');
      subscriber.next(null);
      subscriber.complete();
    })
  }
  
   isConnected(): boolean {
    return JSON.parse(sessionStorage.getItem('user')) !== null
  }
}
