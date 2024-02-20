import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import AppStore from "../../../store/Appstore";
import {FormActionProps, InputList} from "@common-components/interfaces";
import {Validators} from "@angular/forms";
import {CONTACT_REGEX} from "../../../../utils/RegexUtils";
import {IEmployeeService} from "../../../services/employee/IEmployee.service";
import {EmployeeService} from "../../../services/employee/employee.service";
import {DataDto} from "../../../dto/data.dto";
import {setUser} from "../../../store/user/user.action";
import {UserDTO} from "../../../dto/user.dto";
import {showSuccess} from "@common-components/services/sweet-alert.util";
import {CalendarOptions} from "@fullcalendar/core";
import timegridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import frLocale from '@fullcalendar/core/locales/fr';

export interface UserEditableInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

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
    currentPassword: {
      label: "Mot de passe actuel",
      type: "password",
      validators: Validators.required
    },
    password: {
      label: "Nouveau de passe",
      type: "password"
    },
    confirmPassword: {
      label: "Confirmez votre mot de passe",
      type: "password"
    }
  };

  connectedUser?: any;
  editFormActions: FormActionProps[] = [
    {
      label: "Enregistrer mes modifications",
      color: "primary",
      validDataOnly: true
    },
    {
      label: "Retour",
      color: "",
      onClick: ()=> {} // TODO: add back link here
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
    plugins: [timegridPlugin, bootstrap5Plugin],
    slotMinTime: "06:00:00",
    slotMaxTime: "18:00:00",
    themeSystem: "bootstrap5",
    height: "auto"
  };

  onEditSuccess = (successResponse: DataDto<UserEditableInfo>) => {
    this.store.dispatch(setUser(successResponse.data as UserDTO));
    showSuccess(() => {}, "Vos informations ont bien été mis à jour");
  }

  constructor(
    private store: Store<AppStore>,
    private employeeAuthService: EmployeeService) {
    this.method = this.employeeAuthService.updatePersonalInfo.bind(this.employeeAuthService);
  }

  ngOnInit() {
    this.store.pipe().subscribe((appData: AppStore) => {
      const {user} = appData;
      this.calendarOptions.events = user.shifts;
      this.connectedUser = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        password: "",
        confirmPassword: "",
        currentPassword: ""
      }
    });
  }

}
