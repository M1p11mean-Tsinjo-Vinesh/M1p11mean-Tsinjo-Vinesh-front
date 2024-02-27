import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppointmentDto} from "../../../data/dto/appointment.dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
    private formBuilder: FormBuilder
  ) {
    this.appointment = this.router.getCurrentNavigation().extras.state as AppointmentDto;
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
      console.log(this.paymentForm.value);
    }
  }

}
