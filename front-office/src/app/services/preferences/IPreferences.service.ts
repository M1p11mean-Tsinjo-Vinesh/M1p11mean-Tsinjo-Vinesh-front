import {Observable} from "rxjs";
import {TFilteredList} from "../../data/type/FilteredList.type";
import {EmployeeDTO} from "../../data/dto/employee.dto";
import {ServiceDto} from "../../data/dto/service.dto";

export interface IPreferencesService {
  findEmployees(
    page?: number,
    offset?: number,
    column?: string,
    method?: number,
    fullName?: string,
  ): Observable<TFilteredList<EmployeeDTO>>
  findServices(
    page?: number,
    offset?: number,
    column?: string,
    method?: number,
    name?: string,
  ): Observable<TFilteredList<ServiceDto>>
}