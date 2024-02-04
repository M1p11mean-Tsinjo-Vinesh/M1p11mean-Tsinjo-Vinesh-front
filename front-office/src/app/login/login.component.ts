import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UniqueMailValidator} from "../validators/unique-mail-validator";
import {ClientService} from "../services/client/client.service";
import {Router} from "@angular/router";
import {showSuccess} from "../../components/services/sweet-alert.util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: [
        '',
        {
          updateOn: 'blur',
          validators: [
            // Validators.required,
            // Validators.email,
          ],
        },
    ],
    password: [
        '',[
          // Validators.required,
          // Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$')
        ]
    ]
  });
  focus;
  focus1;
  constructor(private formBuilder: FormBuilder, private clientService: ClientService, private router: Router) {

  }

  ngOnInit() {
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.clientService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(response => {
        showSuccess(
          () => this.router.navigate(['/home']),
          "Connexion réussie, vous êtes maintenant connecté à votre compte");
      });
    }
  }

}
