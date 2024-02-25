import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SalesDto} from "../../dto/sales.dto";
import {DataDto} from "../../dto/data.dto";
import {baseUrl} from "../../../config/server.config";
import {AppointmentCountDto} from "../../dto/appointmentCount.dto";
import {WorkingTimeDto} from "../../dto/workingTime.dto";

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  constructor(
    private httpClient: HttpClient
  ) {}

  getSalesPerDay(year: number, month: number): Observable<SalesDto[]> {
    return new Observable<SalesDto[]>(subscriber => {
      this.httpClient.get<DataDto<SalesDto[]>>(baseUrl(`stats/sales?year=${year}&month=${month}`))
        .subscribe((response: DataDto<SalesDto[]>) => {
          subscriber.next(response.data);
          subscriber.complete();
        })
    })
  }

  getSalesPerMonth(year: number): Observable<SalesDto[]> {
    return new Observable<SalesDto[]>(subscriber => {
      this.httpClient.get<DataDto<SalesDto[]>>(baseUrl(`stats/sales-per-month?year=${year}`))
        .subscribe((response: DataDto<SalesDto[]>) => {
          subscriber.next(response.data);
          subscriber.complete();
        })
    })
  }

  getAppointmentsPerDay(year: number, month: number): Observable<AppointmentCountDto[]> {
    return new Observable<AppointmentCountDto[]>(subscriber => {
      this.httpClient.get<DataDto<AppointmentCountDto[]>>(baseUrl(`stats/appointment-count?year=${year}&month=${month}`))
        .subscribe((response: DataDto<AppointmentCountDto[]>) => {
          subscriber.next(response.data);
          subscriber.complete();
        })
    })
  }

  getAppointmentsPerMonth(year: number): Observable<number[]> {
    return new Observable<number[]>(subscriber => {
      this.httpClient.get<DataDto<number[]>>(baseUrl(`stats/appointment-count-per-month?year=${year}`))
        .subscribe((response: DataDto<number[]>) => {
          subscriber.next(response.data);
          subscriber.complete();
        })
    })
  }

  getMeanWorkingTime(year: number, month: number): Observable<WorkingTimeDto[]> {
    return new Observable<WorkingTimeDto[]>(subscriber => {
      this.httpClient.get<DataDto<WorkingTimeDto[]>>(baseUrl(`stats/mean-working-time?year=${year}&month=${month}`))
        .subscribe((response: DataDto<WorkingTimeDto[]>) => {
          subscriber.next(response.data);
          subscriber.complete();
        })
    })
  }
}
