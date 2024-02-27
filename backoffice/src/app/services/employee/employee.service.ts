import { Injectable } from '@angular/core';
import {IEmployeeService} from "./IEmployee.service";
import {baseUrl} from "../../../config/server.config";
import {Observable} from "rxjs";
import {DataDto} from "../../dto/data.dto";
import {AuthDto} from "../../dto/auth.dto";
import {HttpClient} from "@angular/common/http";
import {JwtDecoderService, ObserverObject} from "../../../components";
import AppStore from "../../store/Appstore";
import {Store} from "@ngrx/store";
import {setUser} from "../../store/user/user.action";
import {startApiCall} from "@common-components/services/sweet-alert.util";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService implements IEmployeeService{

  constructor(private http: HttpClient, private jwtDecoder: JwtDecoderService, private store: Store<AppStore> ) { }

  login(email: string, password: string): Observable<DataDto<AuthDto>> {
    return new Observable<DataDto<AuthDto>>( subscriber => {
      const loginApiCall = () => this.http.post(baseUrl('employees-auth/login'), {
        email: email,
        password: password
      }).subscribe(ObserverObject((response: DataDto<AuthDto>) => {
        if(response.data) {
          const {jwt} = response.data;
          const tokenData = this.jwtDecoder.decode(jwt);
          tokenData.token = jwt;
          this.store.dispatch(setUser(tokenData));
        }
        subscriber.next(response);
        subscriber.complete();
      }));
      startApiCall(loginApiCall);
    });
  }

  updatePersonalInfo(data: object): Observable<any>  {
    console.log(data);
    return this.http.put(baseUrl("employees-auth/update-info"), data);
  }

  createEmployee(data: object): Observable<any> {
    return this.http.post(baseUrl('employees'), data);
  }

  updateEmployee(id: string,data: object): Observable<any> {
    return this.http.put(baseUrl(`employees/${id}`), data);
  }

  findById(id: string): Observable<any> {
    return this.http.get(baseUrl(`employees/${id}`));
  }
}
