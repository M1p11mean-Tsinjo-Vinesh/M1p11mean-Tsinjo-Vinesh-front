import {Component, Input} from '@angular/core';
import {AppointmentDto} from "../../../data/dto/appointment.dto";
import {getStatusBadge} from "../../../utils/status.utils";

@Component({
  selector: 'app-appointment-general-info',
  templateUrl: './appointment-general-info.component.html',
  styleUrls: ['./appointment-general-info.component.css']
})
export class AppointmentGeneralInfoComponent {

  @Input({required: true})
  appointment!: AppointmentDto;

  protected readonly getStatusBadge = getStatusBadge;
}
