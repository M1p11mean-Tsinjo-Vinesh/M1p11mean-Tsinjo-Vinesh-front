import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {AppointmentDto} from "../dto/appointment.dto";
import {BehaviorSubject, catchError, finalize, Observable, of} from "rxjs";
import {AppointmentService} from "../../services/appointment/appointment.service";
import {TFilterElement} from "../type/filterElement.type";

export class AppointmentDatasource implements DataSource<AppointmentDto> {
  private appointmentsSubject = new BehaviorSubject<AppointmentDto[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  public loading$ = this.loadingSubject.asObservable();
  public pageSize: number = 10;
  public length: number = 0;
  public page: number = 1;
  
  
  constructor(private appointmentService: AppointmentService) {}
  
  connect(collectionViewer: CollectionViewer): Observable<AppointmentDto[]> {
    return this.appointmentsSubject.asObservable();
  }
  
  disconnect(collectionViewer: CollectionViewer) {
    this.appointmentsSubject.complete();
    this.loadingSubject.complete();
  }
  
  loadAppointments(
    page = 1,
    offset = 10,
    column = 'appointmentDate',
    method = 1,
    status?: TFilterElement<number>,
    appointmentDate?: TFilterElement<Date>) {
    this.appointmentsSubject.next([]);
    this.loadingSubject.next(true);
    this.appointmentService.findAppointments(page, offset, column, method, status, appointmentDate)
      .pipe(
        catchError(() => of({
          elements:[],
          count: 0,
          pageSize: 0,
          page: 1
        })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        appointments => {
          this.length = appointments.count;
          this.pageSize = appointments.pageSize;
          this.page = appointments.page;
          this.appointmentsSubject.next(appointments.elements)
        });
  }
}