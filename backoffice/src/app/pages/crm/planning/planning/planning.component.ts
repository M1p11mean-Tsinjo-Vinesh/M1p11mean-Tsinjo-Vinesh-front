import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import frLocale from "@fullcalendar/core/locales/fr";
import timegridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import {AppointmentService} from "../../../../services/appointment/appointment.service";
import {addMinutes} from "date-fns";
import {EPlanningStatusColor} from "../../../../enum/EPlanningStatusColor.enum";
import {AppointmentDetailsDto} from "../../../../dto/appointmentDetails.dto";
import {showSuccess} from "@common-components/services/sweet-alert.util";

const statusColor: {[key:number]: EPlanningStatusColor} = {
  10: EPlanningStatusColor.TODO,
  30: EPlanningStatusColor.DONE,
}

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit{

  appointmentDetailsList: AppointmentDetailsDto[] = [];
  public confirmVisible = false;
  currentAppointmentDetailsId = "";

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    weekends: false,
    events: [],
    locale: frLocale,
    editable: true,
    allDaySlot: false,
    slotDuration: "00:15:00",
    plugins: [timegridPlugin, bootstrap5Plugin],
    slotMinTime: "06:00:00",
    slotMaxTime: "18:00:00",
    themeSystem: "bootstrap5",
    height: "auto",
    eventClick: ($event) => this.selectEvent($event)
  }

  constructor(private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.loadAppointmentsDetails();
  }

  loadAppointmentsDetails() {
    this.appointmentService.getAppointmentDetailsList().subscribe((appointments) => {
      let events = [];
      this.appointmentDetailsList = appointments;
      for (const appointment of appointments) {
        events.push({
          title: `${appointment.service.name} - ${appointment.client.name}`,
          start: appointment.startDate.split(".")[0],
          end: addMinutes(appointment.startDate,appointment.service.duration).toJSON().split(".")[0],
          backgroundColor: statusColor[appointment.status],
          borderColor: statusColor[appointment.status],
          detailsId: appointment._id,
          status: appointment.status
        });
      }
      this.calendarOptions.events = events;
    });
  }

  selectEvent(event: any) {
    if (event.event.extendedProps.status === 30) return;
    this.currentAppointmentDetailsId = event.event.extendedProps.detailsId;
    this.confirmVisible = true;
  }

  setTaskAsDone() {
    this.appointmentService.markAsDone(this.currentAppointmentDetailsId).subscribe(() => {
      showSuccess(() => {
        this.confirmVisible = false;
        this.loadAppointmentsDetails();
      }, "La tâche a bien été marquée comme terminée");
    });
  }
}
