import {Observable} from "rxjs";
import {AppointmentDto} from "../../data/dto/appointment.dto";
import {TFilterElement} from "../../data/type/filterElement.type";
import {TFilteredList} from "../../data/type/FilteredList.type";

export interface IAppointmentService {
  findAppointments(
    page: number,
    offset: number,
    column: string,
    method: number, // sort
    status?: TFilterElement<number>, // TODO : change to TFilterElement<number[]>
    appointmentDate?: TFilterElement<Date>,
  ): Observable<TFilteredList<AppointmentDto>>
}