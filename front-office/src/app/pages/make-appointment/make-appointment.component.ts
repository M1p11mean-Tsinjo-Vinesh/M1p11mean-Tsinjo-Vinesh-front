import {Component, ViewChild} from '@angular/core';
import {CalendarOptions, EventSourceInput} from "@fullcalendar/core";
import frLocale from "@fullcalendar/core/locales/fr";
import timegridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import {FullCalendarComponent} from "@fullcalendar/angular";
import interactionPlugin from '@fullcalendar/interaction';
import {PreferencesService} from "../../services/preferences/preferences.service";
import {ServiceDto} from "../../data/dto/service.dto";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {EmployeeDTO} from "../../data/dto/employee.dto";
import {AppointmentDetailsDto} from "../../data/dto/appointmentDetails.dto";
import {addMinutes, format} from "date-fns";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {AppointmentService} from "../../services/appointment/appointment.service";
import {AppointmentSubmitDto} from "../../data/dto/appointment.dto";
import {showError, showSuccess} from "../../../components/services/sweet-alert.util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.scss']
})
export class MakeAppointmentComponent {
  protected readonly faXmark = faXmark;
  
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @ViewChild('employeeModal') employeeModal: any;
  startDate: string = "";
  lastDate: string | null = null;
  services: ServiceDto[] = [];
  serviceControl: FormControl = new FormControl();
  estimatedDuration: number = 0;
  estimatedPrice: number = 0;
  idCounter: number = 0;
  
  employees: EmployeeDTO[] = [];
  employeeControl: FormControl = new FormControl();
  
  appointmentDetails: AppointmentDetailsDto[] = [];
  
  _onDestroy = new Subject<void>();
  
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridDay',
    weekends: false,
    events: [],
    locale: frLocale,
    allDaySlot: false,
    plugins: [timegridPlugin, bootstrap5Plugin, interactionPlugin],
    slotMinTime: "06:00:00",
    slotMaxTime: "17:00:00",
    themeSystem: "bootstrap5",
    height: "auto",
    snapDuration: "00:05:00",
    eventStartEditable: true,
    eventOverlap: false,
    eventDrop: (info) => {
      console.log(info.event.id)
      const details = this.appointmentDetails
        .find((details) => details._id === info.event.id);
      details.startDate = info.event.startStr;
      details.endDate = info.event.endStr;
    }
  }
  
  constructor(
    private preferencesServices: PreferencesService,
    private modalService: NgbModal,
    private appointmentService: AppointmentService,
    private router: Router
  ) {
  }
  
  ngOnInit() {
    const startDate = new Date();
    startDate.setHours(8,0,0,0);
    this.startDate = startDate.toJSON();
    this.preferencesServices.findServices(1,null).subscribe((preferences) => {
      this.services = preferences.elements;
    });
    this.preferencesServices.findEmployees(1,null).subscribe((preferences) => {
      this.employees = preferences.elements;
      console.log(this.employees);
    });
    this.serviceControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.openEmployeeModal();
      })
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  
  open(content: any, type = '', modalDimension = '') {
    this.modalService.open(content,{ centered: true, backdrop: 'static' });
  }
  
  changeDate($event: any) {
    this.calendarComponent.getApi().gotoDate($event.target.value);
    this.startDate = $event.target.value;
  }
  
  openEmployeeModal() {
    this.open(this.employeeModal);
  }
  
  assignEmployee() {
    const service = this.serviceControl.value;
    const employee = this.employeeControl.value;
    const endDateBase = this.lastDate ?? this.startDate;
    const startDate = this.lastDate ?? this.startDate;
    const endDate = addMinutes(endDateBase,service.duration).toJSON();
    this.lastDate = endDate;
    this.appointmentDetails.push({
      service: service,
      employee: employee,
      startDate: startDate,
      endDate: endDate,
      _id: "id-" + this.idCounter++
    });
    this.serviceControl.setValue(null);
    this.employeeControl.setValue(null);
    this.buildEvent();
    this.modalService.dismissAll();
  }
  
  saveServiceWithoutEmployee() {
    const service = this.serviceControl.value;
    const endDateBase = this.lastDate ?? this.startDate;
    const startDate = this.lastDate ?? this.startDate;
    const endDate = addMinutes(endDateBase,service.duration).toJSON();
    this.lastDate = endDate;
    this.appointmentDetails.push({
      service: service,
      startDate: startDate,
      endDate: endDate,
      _id: "id-" + this.idCounter++
    });
    this.serviceControl.setValue(null);
    this.buildEvent();
    this.modalService.dismissAll();
  }
  
  buildEvent() {
    this.estimatedDuration = this.appointmentDetails.reduce((acc,appointment) => acc + appointment.service.duration,0);
    this.estimatedPrice = this.appointmentDetails.reduce((acc,appointment) => acc + appointment.service.price,0);
    let events: EventSourceInput = [];
    for (const appointment of this.appointmentDetails) {
      events.push({
        title: `${appointment.service.name} - ${appointment.employee?.fullName ?? 'Aucun'}`,
        start: appointment.startDate,
        end: appointment.endDate,
        id: appointment._id,
      });
    }
    this.calendarOptions.events = events;
    console.log(this.calendarOptions.events);
  }
  
  removeDetails(appointment: AppointmentDetailsDto) {
    this.appointmentDetails = this.appointmentDetails.filter((details) => details !== appointment);
    this.buildEvent();
  }
  
  onSubmit() {
    const firstDetail = this.appointmentDetails.reduce((a,b) => a.startDate < b.startDate ? a : b);
    const startDate = new Date(firstDetail.startDate).getMilliseconds() < new Date(this.startDate).getMilliseconds() ? firstDetail.startDate : this.startDate;
    const submitData: AppointmentSubmitDto = {
      appointmentDate: format(startDate,"yyyy-MM-dd'T'HH:mm:ssXXX"),
      elements: this.appointmentDetails.map((details) => {
        return {
          employee: details.employee?._id,
          service: details.service._id
        }
      })
    }
    console.log(submitData);
    this.appointmentService.makeAppointment(submitData).subscribe(
      (res) => {
        showSuccess(() =>{
          this.router.navigate(['/user-appointments']);
        }, "Rendez-vous pris avec succès")
      },
      (err) => {
        showError(err.error.message)
      }
    )
  }
}
