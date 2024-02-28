import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppointmentService} from "../../services/appointment/appointment.service";
import {AppointmentDto} from "../../data/dto/appointment.dto";
import {EApointmentStatus} from "../../data/enum/appointmentStatus.enum";
import {ObserverObject} from "../../services/util";
import {startApiCall} from "../../services/sweet-alert.util";

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent {

  appointment: AppointmentDto;
  displayedColumns: string[] = ["service","employee","duration","price"];
  appointmentId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appointmentService: AppointmentService
  ) {}
  
  ngOnInit() {
    this.appointmentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.load();
  }

  load() {
    this.appointmentService.findById(this.appointmentId).subscribe((appointment) => {
      this.appointment = appointment;
    })
  }
  
  protected readonly EApointmentStatus = EApointmentStatus;

  cancelAppointment() {
    const apiCall = () => this.appointmentService.cancelAppointment(this.appointment._id).subscribe(ObserverObject(res => {
      this.load();
    }));
    startApiCall(apiCall);
  }
}
