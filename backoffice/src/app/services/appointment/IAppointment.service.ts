import {Observable} from "rxjs";
import {AppointmentDetailsDto} from "../../dto/appointmentDetails.dto";
import {TFilteredList} from "../../type/FilteredList.type";

export interface IAppointmentService {
  getAppointmentDetailsList(): Observable<AppointmentDetailsDto[]>;
  markAsDone(appointmentId: string): Observable<void>;
}
