import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {passwordConfirmationValidator} from "../../validators/password-confirmation.validator";
import {UniqueMailValidator} from "../../validators/unique-mail.validator";
import {ClientService} from "../../services/client/client.service";
import {UserSignUpDTO} from "../../data/dto/user.dto";
import {showSuccess} from "../../../components/services/sweet-alert.util";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    signupForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: [
          '',
          {
            updateOn: 'blur',
            validators: [
              Validators.required,
              Validators.email
            ],
            asyncValidators: [this.uniqueMailValidator.validate.bind(this.uniqueMailValidator)],
          }
        ],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern('^(0|\\+261)[0-9]{9}$'),
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$'),
          ]
        ],
        confirmPassword: [
          '',
          [Validators.required]
        ],
    }, {validators: passwordConfirmationValidator})
    constructor(
      private formBuilder: FormBuilder,
      private uniqueMailValidator: UniqueMailValidator,
      private clientService: ClientService,
      private router: Router
    ) { }

    ngOnInit() {}
  
    onSubmit() {
      if(this.signupForm.valid) {
        const user: UserSignUpDTO = {
          firstName: this.signupForm.value.firstName,
          lastName: this.signupForm.value.lastName,
          email: this.signupForm.value.email,
          phone: this.signupForm.value.phone,
          password: this.signupForm.value.password,
          confirmPassword: this.signupForm.value.confirmPassword
        }
        this.clientService.register(user).subscribe(response => {
          showSuccess(
            () => this.router.navigate(['/home']),
            "Inscription réussie, vous êtes maintenant connecté à votre compte");
        })
      }
    }
  
  protected readonly JSON = JSON;
}
