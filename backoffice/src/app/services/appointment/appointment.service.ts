import {IAppointmentService} from "./IAppointment.service";
import {Observable} from "rxjs";
import {AppointmentDetailsDto} from "../../dto/appointmentDetails.dto";
import {HttpClient} from "@angular/common/http";
import {baseUrl} from "../../../config/server.config";
import {DataDto} from "../../dto/data.dto";
import {TFilteredList} from "../../type/FilteredList.type";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService implements IAppointmentService {

  constructor(private http: HttpClient) {
  }

  getAppointmentDetailsList(): Observable<AppointmentDetailsDto[]> {
    return new Observable<AppointmentDetailsDto[]>(subscriber => {
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
}
