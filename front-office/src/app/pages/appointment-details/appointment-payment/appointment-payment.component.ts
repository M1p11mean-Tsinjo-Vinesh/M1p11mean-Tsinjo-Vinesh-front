import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppointmentDto} from "../../../data/dto/appointment.dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {showSuccess, startApiCall} from "../../../services/sweet-alert.util";
import {AppointmentService} from "../../../services/appointment/appointment.service";
import {ObserverObject} from "../../../services/util";

@Component({
  selector: 'app-appointment-payment',
  templateUrl: './appointment-payment.component.html',
  styleUrls: ['./appointment-payment.component.css']
})
export class AppointmentPaymentComponent implements OnInit {

  appointment: AppointmentDto;
  paymentForm!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService
  ) {
    this.appointment = this.router.getCurrentNavigation().extras.state as AppointmentDto;
    console.log(this.appointment);
    if(!this.appointment) {
      this.router.navigate(["profile", "historique-rendez-vous"]);
    }
  }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^(0|\\+261)[0-9]{9}$'),
      ]]
    });
  }

  doPayment() {
    if(this.paymentForm.valid) {
      const apiCall = () => {
        this.appointmentService.payAppointment(this.appointment._id).subscribe(ObserverObject(res =>
          showSuccess(() => this.router.navigate(["profile", "historique-rendez-vous"]),
            "Paiement éffectué avec succès !")
        ))
      }
      startApiCall(apiCall);
    }
  }

}
