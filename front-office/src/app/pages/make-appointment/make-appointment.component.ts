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
import {addMinutes} from "date-fns";
import {faCross, faXmark} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.scss']
})
export class MakeAppointmentComponent {
  
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @ViewChild('employeeModal') employeeModal: any;
  startDate: string = new Date().toISOString();
  lastDate: string | null = null;
  services: ServiceDto[] = [];
  serviceControl: FormControl = new FormControl();
  estimatedDuration: number = 0;
  estimatedPrice: number = 0;
  
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
    
  }
  
  constructor(
    private preferencesServices: PreferencesService,
    private modalService: NgbModal,
  ) {
  }
  
  ngOnInit() {
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
      endDate: endDate
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
      endDate: endDate
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
        startEditable: true,
      });
    }
    this.calendarOptions.events = events;
    console.log(this.calendarOptions.events);
  }
  
  removeDetails(appointment: AppointmentDetailsDto) {
    this.appointmentDetails = this.appointmentDetails.filter((details) => details !== appointment);
    this.buildEvent();
  }
  
  protected readonly faXmark = faXmark;
}
