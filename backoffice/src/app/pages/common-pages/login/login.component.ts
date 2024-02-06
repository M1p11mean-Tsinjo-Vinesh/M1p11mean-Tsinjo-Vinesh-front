import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EmployeeService} from "../../../services/employee/employee.service";
import {showSuccess} from "@common-components/services/sweet-alert.util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
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
          () => this.router.navigate(['/crm/edit-profile']),
          "Connexion réussie, vous êtes maintenant connecté à votre compte");
      });
    }
  }
}
