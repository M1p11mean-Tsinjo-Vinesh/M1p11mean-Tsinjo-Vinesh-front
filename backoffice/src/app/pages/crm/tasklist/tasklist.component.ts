import { Component } from '@angular/core';
import {AppointmentDetailsDto} from "../../../dto/appointmentDetails.dto";
import {AppointmentService} from "../../../services/appointment/appointment.service";
import {FormControl} from "@angular/forms";
import {tap} from "rxjs";
import {isAfter} from "date-fns";

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent {
  dataSource: AppointmentDetailsDto[] = []
  displayedColumns: string[] = ["id", "client", "service", "commission"]
  selectedDate: FormControl = new FormControl<Date>(new Date());

  constructor(
    private appointmentService: AppointmentService
  ) {
  }

  ngOnInit() {
    this.fetchAppointments();
    this.selectedDate.valueChanges.pipe(
      tap(() => {
        const date = this.selectedDate.value
        if (isAfter(date,new Date())) {
          this.selectedDate.setValue(new Date())
        } else {
          this.fetchAppointments()
        }
      })
    ).subscribe()

  }

  getTotalCommission() {
    return this.dataSource.map(t => t.service).reduce((acc, value) => acc + value.commission*value.price, 0);
  }

  fetchAppointments() {
    this.appointmentService.getAppointmentDetailsListByDate(this.selectedDate.value).subscribe((appointments) => {
      this.dataSource = appointments;
    })
  }
}
