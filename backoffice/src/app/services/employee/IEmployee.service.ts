import {Observable} from "rxjs";

export interface IEmployeeService {
  login(email: string, password: string): void;
  updatePersonalInfo(data: object): Observable<any>;
}
