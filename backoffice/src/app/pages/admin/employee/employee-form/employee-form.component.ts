import { Component } from '@angular/core';
import {extract, FormActionProps, GetterFn, InputList, SelectProps} from "@common-components/interfaces";
import {Validators} from "@angular/forms";
import {CONTACT_REGEX} from "../../../../../utils/RegexUtils";
import {IEmployeeService} from "../../../../services/employee/IEmployee.service";
import {CalendarOptions} from "@fullcalendar/core";
import frLocale from "@fullcalendar/core/locales/fr";
import timegridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import {DataDto} from "../../../../dto/data.dto";
import {showError, showSuccess} from "@common-components/services/sweet-alert.util";
import {UserEditableInfo} from "../../../crm/edit-profile/edit-profile.component";
import interactionPlugin from '@fullcalendar/interaction';
import {format} from "date-fns";
import {EmployeeService} from "../../../../services/employee/employee.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
  title = "Ajout d'un employé";
  employee?: any;
  currentId: string| null = null;

  editProfileInputs: InputList = {
    firstName: {
      label: "Nom",
      type: "text",
      validators: Validators.required
    },
    lastName: {
      label: "Prénom",
      type: "text",
      validators: Validators.required
    },
    email: {
      label: "Email",
      type: "email",
      validators: [Validators.email, Validators.required]
    },
    phone: {
      label: "Numéro de téléphone",
      type: "text",
      validators: [Validators.required, Validators.pattern(CONTACT_REGEX)]
    },
    employeeType: {
      label: "Autorisation",
      options: ["EMPLOYEE", "MANAGER"].map(val => ({key: val, value: val})),
      getValue: self => self.key,
      getText: self => self.value,
      autoComplete: false,
      validators: [Validators.required],
      default: "EMPLOYEE",
      searchKey: "value"
    } as SelectProps,
  };

  editFormActions: FormActionProps[] = [
    {
      label: "Enregistrer",
      color: "primary",
      validDataOnly: true,
      onClick: (data: any) => {
        this.employee = {
          ...data,
          shifts: this.employee.shifts
        }
        this.updateEmployee();
      }
    },
    {
      label: "Retour",
      color: "",
      onClick: ()=> {
        window.history.back();
      }
    }
  ];

  method!: Function;
  service!: IEmployeeService;

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    weekends: false,
    events: [],
    locale: frLocale,
    editable: true,
    allDaySlot: false,
    plugins: [timegridPlugin, bootstrap5Plugin, interactionPlugin],
    slotMinTime: "06:00:00",
    slotMaxTime: "18:00:00",
    themeSystem: "bootstrap5",
    eventStartEditable: true,
    eventOverlap: false,
    height: "auto",
    eventDrop: (info) => this.updateEmployeeShifts(info),
    eventResize: (info) => this.updateEmployeeShifts(info)
  };

  constructor(
    private employeeService: EmployeeService,
    private activedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const id = this.activedRoute.snapshot.paramMap.get('id');
    this.currentId = id;
    if (id) {
      this.employeeService.findById(id).subscribe((employee) => {
        this.employee = employee.data;
        this.buildEvents()
      });
    } else {
      this.editProfileInputs["password"] = {
        label: "Mot de passe",
        type: "password",
        validators: [Validators.required]
      }
      this.editProfileInputs["confirmPassword"] = {
        label: "Confirmez votre mot de passe",
        type: "password",
        validators: [Validators.required]
      }
      this.employee = {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        password: "",
        confirmPassword: "",
        employeeType: "EMPLOYEE",
        shifts: [
          {
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: "08:00",
            endTime: "12:00"
          },
          {
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: "13:00",
            endTime: "17:00"
          }
        ]
      }
    }
    this.buildEvents()
  }

  buildEvents() {
    this.calendarOptions.events = this.employee.shifts;
  }

  onEditSuccess = (successResponse: DataDto<UserEditableInfo>) => {
    showSuccess(() => {
      if (this.employee._id === undefined || this.employee._id === null) {
        window.history.back();
      }
    }, "Vos informations ont bien été mis à jour");
  }

  updateEmployeeShifts(info: any) {
    console.log(info.oldEvent)
    const oldDate = info.oldEvent.start!;
    const oldDay = oldDate.getDay()
    const oldHours = format(oldDate, "HH:mm");
    const shift = this.employee.shifts.find((shift: any) => shift.daysOfWeek.includes(oldDay) && shift.startTime === oldHours);
    shift.daysOfWeek.splice(shift.daysOfWeek.indexOf(oldDay), 1);

    const date = info.event.start!;
    const day = date.getDay()
    const hours = format(date, "HH:mm");
    const newShift = {
      daysOfWeek: [day],
      startTime: hours,
      endTime: format(info.event.end!, "HH:mm")
    }
    this.employee.shifts.push(newShift);
    this.employee.shifts = this.employee.shifts.filter((shift: any) => shift.daysOfWeek.length != 0 );
    console.log(this.employee.shifts)
    this.buildEvents()
  }

  updateEmployee() {
    if (this.currentId) {
      this.employeeService.updateEmployee(this.currentId,this.employee).subscribe({
        next: this.onEditSuccess,
        error: (error) => showError(error.error.message)
      });
    } else {
      this.employeeService.createEmployee(this.employee).subscribe({
        next: this.onEditSuccess,
        error: (error) => showError(error.error.message)
      });
    }
  }
}
