import { Injectable } from '@angular/core';
import {IEmployeeService} from "./IEmployee.service";
import {baseUrl} from "../../../config/server.config";
import {Observable} from "rxjs";
import {DataDto} from "../../dto/data.dto";
import {AuthDto} from "../../dto/auth.dto";
import {HttpClient} from "@angular/common/http";
import {JwtDecoderService} from "../../../components";
import AppStore from "../../store/Appstore";
import {Store} from "@ngrx/store";
import {setUser} from "../../store/user/user.action";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements IEmployeeService{

  constructor(private http: HttpClient, private jwtDecoder: JwtDecoderService, private store: Store<AppStore> ) { }

  login(email: string, password: string): Observable<DataDto<AuthDto>> {
    return new Observable<DataDto<AuthDto>>( subscriber => {
      this.http.post(baseUrl('employees-auth/login'), {
        email: email,
        password: password
      }).subscribe((response: DataDto<AuthDto>) => {
        if(response.data) {
          const tokenData = this.jwtDecoder.decode(response.data.jwt);
          this.store.dispatch(setUser(tokenData));
        }
        subscriber.next(response);
        subscriber.complete();
      });
    });
  }
}
