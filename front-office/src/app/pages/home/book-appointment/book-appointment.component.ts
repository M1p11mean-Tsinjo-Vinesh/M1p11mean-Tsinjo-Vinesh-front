import { Component } from '@angular/core';
import {faCalendarAlt, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent {

  protected readonly faPhoneAlt = faPhoneAlt;
  protected readonly faCalendarAlt = faCalendarAlt;
}
