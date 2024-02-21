import {Injectable} from "@angular/core";
import {IPreferencesService} from "./IPreferences.service";
import {Observable} from "rxjs";
import {TFilteredList} from "../../data/type/FilteredList.type";
import {EmployeeDTO} from "../../data/dto/employee.dto";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../../config/server.config";
import {DataDto} from "../../data/dto/data.dto";
import {ServiceDto} from "../../data/dto/service.dto";

@Injectable({
  providedIn: 'root'
})
export class PreferencesService implements IPreferencesService {
  constructor(private http: HttpClient) { }
  findEmployees(
    page: number = 1,
    offset: number = 10,
    column?: string,
    method?: number,
    fullName?: string,
  ): Observable<TFilteredList<EmployeeDTO>> {
    return new Observable<TFilteredList<EmployeeDTO>>(subscriber => {
      let params = {
        page: page,
        offset: offset,
      }
      if (column) {
        params[`column`] = column;
      }
      if (method) {
        params[`method`] = method;
      }
      if (fullName) {
        params[`fullName`] = fullName;
      }
      this.http.get(baseUrl('/preferences/employees'), {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        },
        params: params
      }).subscribe((response: DataDto<TFilteredList<EmployeeDTO>>) => {
        subscriber.next(response.data);
        subscriber.complete();
      });
    })
  }
  
  findServices(
    page: number = 1,
    offset: number = 10,
    column?: string,
    method?: number,
    name?: string,
  ): Observable<TFilteredList<ServiceDto>> {
    return new Observable<TFilteredList<ServiceDto>>(subscriber => {
      let params = {
        page: page,
        offset: offset,
      }
      if (column) {
        params[`column`] = column;
      }
      if (method) {
        params[`method`] = method;
      }
      if (name) {
        params[`ilike:name`] = name;
      }
      this.http.get(baseUrl('/preferences/services'), {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        },
        params: params
      }).subscribe((response: DataDto<TFilteredList<ServiceDto>>) => {
        subscriber.next(response.data);
        subscriber.complete();
      });
    })
  }
}