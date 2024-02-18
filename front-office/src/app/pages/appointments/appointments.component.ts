import {Component, ViewChild} from '@angular/core';
import {AppointmentDatasource} from "../../data/datasource/appointment.datasource";
import {AppointmentService} from "../../services/appointment/appointment.service";
import {MatPaginator} from "@angular/material/paginator";
import {BehaviorSubject, merge, tap} from "rxjs";
import {EApointmentStatus} from "../../data/enum/appointmentStatus.enum";
import {MatSort} from "@angular/material/sort";
import {TFilterElement} from "../../data/type/filterElement.type";

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {
  dataSource: AppointmentDatasource
  displayedColumns: string[] = ["appointmentDate", "estimatedDuration","estimatedPrice", "status"]
  activeStatus: EApointmentStatus[] = [EApointmentStatus.PENDING, EApointmentStatus.VALIDATED, EApointmentStatus.CANCELED, EApointmentStatus.PAID];
  activeAppointmentDateFilteroptions: string[] = []
  filterChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private AppointmentService: AppointmentService) {}
  
  ngOnInit() {
    this.dataSource = new AppointmentDatasource(this.AppointmentService);
    this.dataSource.loadAppointments();
  }
  
  ngAfterViewInit() {
    this.filterChanged.subscribe(() => {
      console.log("filter changed")
      this.paginator.pageIndex = 0;
      this.loadAppointmentsPage()
    });
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadAppointmentsPage())
      )
      .subscribe();
  }
  
  loadAppointmentsPage() {
    let appointmentDate: TFilterElement<Date> = null;
    if(this.activeAppointmentDateFilteroptions.length == 1){
      const date = new Date();
      const method = this.activeAppointmentDateFilteroptions[0] === 'past' ? "lte" : "gte";
      appointmentDate = {
        method: method,
        value: date
      }
    }
    this.dataSource.loadAppointments(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction === "asc" ? 1 : -1,
      null,
      appointmentDate
    );
  }
  
  getStatusBadge(status: EApointmentStatus) {
    switch (status) {
      case EApointmentStatus.PENDING:
        return "badge-primary"
      case EApointmentStatus.VALIDATED:
        return "badge-info"
      case EApointmentStatus.CANCELED:
        return "badge-danger"
      case EApointmentStatus.PAID:
        return "badge-success"
      default:
        return "badge-secondary"
    }
  }
  
  getFilterStatusBadge(status: EApointmentStatus) {
    return this.activeStatus.includes(status) ? this.getStatusBadge(status) : "badge-secondary";
  }
  
  toggleActiveStatus(status: EApointmentStatus) {
    if (this.activeStatus.includes(status)) {
      this.activeStatus = this.activeStatus.filter(s => s !== status);
    } else {
      this.activeStatus.push(status);
    }
    this.filterChanged.next(!this.filterChanged.getValue())
  }
  
  getFilterAppointmentDateBadge(option: string) {
    if(this.activeAppointmentDateFilteroptions.includes(option)){
      return "badge-primary"
    } else {
      return "badge-secondary"
    }
  }
  
  toggleActiveAppointmentOption(option: string) {
    if(this.activeAppointmentDateFilteroptions.includes(option)){
      this.activeAppointmentDateFilteroptions = this.activeAppointmentDateFilteroptions.filter(o => o !== option);
    } else {
      this.activeAppointmentDateFilteroptions.push(option);
    }
    this.filterChanged.next(!this.filterChanged.getValue())
  }
  
}
