import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../../config/server.config";
import {MailCheckDTO} from "../../dto/client.dto";
import {DataDto} from "../../dto/data.dto";
import {IClientService} from "./IClient.service";
import {AuthDto} from "../../dto/auth.dto";

@Injectable({
  providedIn: 'root'
})
export class ClientService implements IClientService {
  constructor(private http: HttpClient) { }

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
            subscriber.next(response);
            subscriber.complete();
        });
    });
  }
}
