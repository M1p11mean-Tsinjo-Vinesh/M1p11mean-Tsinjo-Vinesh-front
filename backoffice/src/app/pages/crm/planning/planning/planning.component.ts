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
  10: EPlanningStatusColor.DISABLED,
  20: EPlanningStatusColor.TODO,
  30: EPlanningStatusColor.DONE,
  "-10": EPlanningStatusColor.CANCELED
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
  isManager = false;

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    weekends: false,
    events: [],
    locale: frLocale,
    editable: true,
    allDaySlot: false,
    plugins: [timegridPlugin, bootstrap5Plugin],
    slotMinTime: "06:00:00",
    slotMaxTime: "18:00:00",
    themeSystem: "bootstrap5",
    height: "auto",
    eventClick: ($event) => this.selectEvent($event),
    eventMouseEnter: (event) => {
      const tooltipDiv = document.createElement('div');

      // Set the attributes and styles for the <div>
      tooltipDiv.className = 'tooltipevent';
      tooltipDiv.style.background = event.event.backgroundColor;
      tooltipDiv.style.color = 'white';
      tooltipDiv.style.position = 'absolute';
      tooltipDiv.style.zIndex = '10001';
      // Set the content of the <div> (assuming `event.event.title` contains the desired text)
      const title = document.createElement('div');
      title.innerText = event.event.title;
      const time = document.createElement('div');
      time.innerText = `De ${event.event.start?.toLocaleTimeString()} à ${event.event.end?.toLocaleTimeString()}`;
      tooltipDiv.appendChild(time);
      tooltipDiv.appendChild(title);

      document.body.appendChild(tooltipDiv);

      event.el.addEventListener('mouseover', function(e) {
        event.el.style.zIndex = '10000';
        tooltipDiv.style.display = 'block';
        tooltipDiv.style.opacity = '1.9';
      });

      event.el.addEventListener('mousemove', function(e) {
        tooltipDiv.style.top = e.pageY + 10 + 'px';
        tooltipDiv.style.left = e.pageX + 20 + 'px';
      });
      // make the function above without jquery
    },
    eventMouseLeave: (event) => {
      event.el.style.zIndex = 'auto';
      document.querySelector('.tooltipevent')?.remove();
    }
  }

  constructor(private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.loadAppointmentsDetails();
    const data = localStorage.getItem('user');
    if (data) {
      const user = JSON.parse(data);
      this.isManager = user.role === "MANAGER";
    }
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
    if (
      this.isManager ||
      event.event.extendedProps.status !== 20 ||
      event.event.start.getTime() > new Date().getTime()
    ) return;
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
