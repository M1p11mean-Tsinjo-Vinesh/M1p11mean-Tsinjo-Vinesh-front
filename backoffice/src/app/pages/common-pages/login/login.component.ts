import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EmployeeService} from "../../../services/employee/employee.service";
import {showSuccess, startApiCall} from "@common-components/services/sweet-alert.util";
import {Router} from "@angular/router";
import {ObserverElt, ObserverObject} from "@common-components/services/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    email: ['admin-p11@yopmail.com', [Validators.required, Validators.email]],
    password: ['1234', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  onSubmit() {
    if(this.loginForm.valid) {
      this.employeeService.login(this.loginForm.value.email as string, this.loginForm.value.password as string).subscribe(response => {
        showSuccess(
          () => this.router.navigate(['/']),
          "Connexion réussie, vous êtes maintenant connecté à votre compte");
      });
    }
  }
}
