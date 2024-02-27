import {Injectable} from '@angular/core';
import {firstValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../../config/server.config";
import {MailCheckDTO} from "../../data/dto/client.dto";
import {DataDto} from "../../data/dto/data.dto";
import {IClientService} from "./IClient.service";
import {AuthDto} from "../../data/dto/auth.dto";
import {Store} from "@ngrx/store";
import AppStore from "../../store/Appstore";
import {clearUser, setUser} from "../../store/user/user.action";
import {JwtDecoderService} from "../decoder/jwt-decoder.service";
import {UserDTO, UserSignUpDTO, UserUpdateDTO} from "../../data/dto/user.dto";
import {ObserverObject} from "../util";
import {startApiCall} from "../sweet-alert.util";

@Injectable({
  providedIn: 'root'
})
export class ClientService implements IClientService {
  constructor(private http: HttpClient, private store: Store<AppStore>, private jwtDecoder: JwtDecoderService) { }

  isMailAvailable(email: string): Observable<boolean> {
        return new Observable<boolean>(subscriber => {
            this.http.get(baseUrl('clients/checkMail'), {
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
      const loginApiCall = () => this.http.post(baseUrl('clients/login'), {
          email: email,
          password: password
      }).subscribe(ObserverObject((response: DataDto<AuthDto>) => {
        if(response.data) {
          const {jwt} = response.data;
          const tokenData = this.jwtDecoder.decode(jwt);
          sessionStorage.setItem('token', jwt);
          tokenData.token = jwt;
          this.store.dispatch(setUser(tokenData));
        }
        subscriber.next(response);
        subscriber.complete();
      }));
      startApiCall(loginApiCall);
    });
  }

  register(user: UserSignUpDTO): Observable<DataDto<AuthDto>> {
    return new Observable<DataDto<AuthDto>>( subscriber => {
        const apiCall = () => this.http.post(baseUrl('clients/register'), user).subscribe(ObserverObject((response: DataDto<AuthDto>) => {
          const tokenData = this.jwtDecoder.decode(response.data.jwt);
          this.store.dispatch(setUser(tokenData));
          subscriber.next(response);
          subscriber.complete();
        }));
        startApiCall(apiCall);
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
  
  getUser(): UserDTO {
    return JSON.parse(sessionStorage.getItem('user'));
  }
  
  updateUser(user: UserUpdateDTO, addLoader = true): Observable<DataDto<UserDTO>> {
    return new Observable<DataDto<UserDTO>>(subscriber => {
      const apiCall = () => this.http.put(baseUrl('clients/update-info'), user, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }
      }).subscribe(ObserverObject((response: DataDto<UserDTO>) => {
        this.store.dispatch(setUser(response.data));
        subscriber.next(response);
        subscriber.complete();
      }));
      addLoader ? startApiCall(apiCall) : apiCall();
    })
  }

  async addServiceToFavorites(serviceId: string) {
    const {user} = await firstValueFrom(this.store)
    user.favoriteServices.push(serviceId);
    this.registerUserModification(user);
  }

  async removeServiceToFavorites(serviceId: string) {
    const {user} = await firstValueFrom(this.store)
    const index = user.favoriteServices.indexOf(serviceId);
    if(index >= 0) {
      user.favoriteServices.splice(index, 1);
    }
    this.registerUserModification(user);
  }


  async addEmployeeToFavorites(employeeId: string) {
    const {user} = await firstValueFrom(this.store)
    user.favoriteEmployees.push(employeeId);
    this.registerUserModification(user);
  }

  async removeEmployeeToFavorites(employeeId: string) {
    const {user} = await firstValueFrom(this.store)
    const index = user.favoriteEmployees.indexOf(employeeId);
    if(index >= 0) {
      user.favoriteEmployees.splice(index, 1);
    }
    this.registerUserModification(user);
  }

  registerUserModification(user: UserDTO) {
    this.store.dispatch(setUser(user));
    return this.updateUser(user, false).subscribe(res => {});
  }


}
