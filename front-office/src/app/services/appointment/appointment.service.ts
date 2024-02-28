import {IAppointmentService} from "./IAppointment.service";
import {TFilterElement} from "../../data/type/filterElement.type";
import {Observable} from "rxjs";
import {AppointmentDto, AppointmentSubmitDto} from "../../data/dto/appointment.dto";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../../config/server.config";
import {DataDto} from "../../data/dto/data.dto";
import {Injectable} from "@angular/core";
import {TFilteredList} from "../../data/type/FilteredList.type";
import {startApiCall} from "../sweet-alert.util";
import {ObserverObject} from "../util";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService implements IAppointmentService {

  constructor(private http: HttpClient) { }

  payAppointment(appointmentId: string) {
    return this.http.put(baseUrl("payment/appointment/"+ appointmentId), {});
  }

  findAppointments(
    page = 1,
    offset = 10,
    column = 'appointmentDate',
    method = 1,
    status?: TFilterElement<number>,
    appointmentDate?: TFilterElement<Date>): Observable<TFilteredList<AppointmentDto>> {
      return new Observable<TFilteredList<AppointmentDto>>((subscriber) => {
        let params = {
          page: page,
          offset: offset,
          column: column,
          method: method,
        }
        if (status) {
          params[`${status.method}:status`] = `${status.value}`;
        }
        if (appointmentDate) {
          params[`${appointmentDate.method}:appointmentDate`] = `${appointmentDate.value.toJSON()}`;
        }
        this.http.get(baseUrl('appointments'), {
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
          },
          params: params
        }).subscribe((response: DataDto<TFilteredList<AppointmentDto>>) => {
          subscriber.next(response.data);
          subscriber.complete();
        });
      });
  }
  
  makeAppointment(appointment: AppointmentSubmitDto): Observable<AppointmentDto> {
    return new Observable<AppointmentDto>((subscriber) => {
      const apiCall = () => this.http.post(baseUrl('appointments'), appointment).subscribe(ObserverObject((response: DataDto<AppointmentDto>) => {
        subscriber.next(response.data);
        subscriber.complete();
      }))
      startApiCall(apiCall);
    });
  }
  
  
  findById(id: string): Observable<AppointmentDto> {
    return new Observable<AppointmentDto>((subscriber) => {
      this.http.get(baseUrl(`appointments/${id}`)).subscribe((response: DataDto<AppointmentDto>) => {
        subscriber.next(response.data);
        subscriber.complete();
      })
    })
  }
}
