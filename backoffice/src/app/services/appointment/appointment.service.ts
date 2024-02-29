import {IAppointmentService} from "./IAppointment.service";
import {Observable} from "rxjs";
import {AppointmentDetailsDto} from "../../dto/appointmentDetails.dto";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../../config/server.config";
import {DataDto} from "../../dto/data.dto";
import {TFilteredList} from "../../type/FilteredList.type";
import {Injectable} from "@angular/core";
import {format} from "date-fns";
import {AppointmentDto} from "../../dto/appointment.dto";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService implements IAppointmentService {

  constructor(private http: HttpClient) {
  }

  getAppointmentDetailsList(): Observable<AppointmentDetailsDto[]> {
    return new Observable<AppointmentDetailsDto[]>(subscriber => {
      const data = localStorage.getItem('user');
      if (!data) {
        subscriber.error();
        subscriber.complete();
        return;
      }
      this.http.get(baseUrl('employee/appointments'), {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }
      }).subscribe((response: DataDto<TFilteredList<AppointmentDetailsDto>>) => {
        subscriber.next(response.data?.elements);
        subscriber.complete();
      })
    })
  }

  markAsDone(appointmentId: string): Observable<void> {
    return new Observable<void>(subscriber => {
      this.http.put(baseUrl(`employee/appointments/${appointmentId}/done`), {}, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }
      }).subscribe(() => {
        subscriber.next();
        subscriber.complete();
      })
    })
  }

  getAppointmentDetailsListByDate(date: Date): Observable<AppointmentDetailsDto[]> {
    return new Observable<AppointmentDetailsDto[]>(subscriber => {
      const startInterval = new Date(date);
      startInterval.setHours(0,0,0);
      const endInterval = new Date(date);
      endInterval.setHours(23,59,59);
      this.http.get(baseUrl(`employee/appointments?gt:startDate=${this.formatDate(startInterval)}&lt:startDate=${this.formatDate(endInterval)}&eq:status=30`), {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        },
      }).subscribe((response: DataDto<TFilteredList<AppointmentDetailsDto>>) => {
        subscriber.next(response.data?.elements);
        subscriber.complete();
      })
    })
  }

  formatDate(date: Date): string {
    console.log(date.toJSON())
    return format(date,"yyyy-MM-dd'T'HH:mm:ss.SSS");
  }

  findById(id: string): Observable<AppointmentDto> {
    return new Observable<AppointmentDto>((subscriber) => {
      this.http.get(baseUrl(`manager/appointments/${id}`), {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }
      }).subscribe((response: DataDto<AppointmentDto>) => {
        subscriber.next(response.data);
        subscriber.complete();
      })
    })
  }

  validateAppointment(appointmentId: string): Observable<void> {
    return new Observable<void>((subscriber) => {
      this.http.put(baseUrl(`manager/appointments/${appointmentId}/validate`), {}, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }
      }).subscribe({
        next: () => {
          subscriber.next();
          subscriber.complete();
        },
        error: () => {
          subscriber.error();
          subscriber.complete();
        }
      })
    })
  }

  denyAppointment(appointmentID: string): Observable<void> {
    return new Observable<void>((subscriber) => {
      this.http.put(baseUrl(`manager/appointments/${appointmentID}/deny`), {}, {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem('token')}`
        }
      }).subscribe({
        next: () => {
          subscriber.next();
          subscriber.complete();
        },
        error: () => {
          subscriber.error();
          subscriber.complete();
        }
      })
    })
  }
}
