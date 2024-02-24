import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppointmentService} from "../../services/appointment/appointment.service";
import {AppointmentDto} from "../../data/dto/appointment.dto";
import {locale} from "moment";
import {getStatusBadge} from "../../utils/status.utils";
import {EApointmentStatus} from "../../data/enum/appointmentStatus.enum";

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent {
  protected readonly getStatusBadge = getStatusBadge;
  appointment: AppointmentDto;
  displayedColumns: string[] = ["service","employee","duration","price"];
  constructor(
    private activatedRoute: ActivatedRoute,
    private appointmentService: AppointmentService
  ) {}
  
  ngOnInit() {
    const appointmentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.appointmentService.findById(appointmentId).subscribe((appointment) => {
      this.appointment = appointment;
    })
  }
  
  protected readonly EApointmentStatus = EApointmentStatus;
}
