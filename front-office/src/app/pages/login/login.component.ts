import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ClientService} from "../../services/client/client.service";
import {Router} from "@angular/router";
import {showSuccess} from "../../../components/services/sweet-alert.util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email: [
        'rk.tsiresy@yopmail.com',
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
          ],
        },
    ],
    password: [
        'Mypass123',[
          Validators.required,
        ]
    ]
  });
  constructor(private formBuilder: FormBuilder, private clientService: ClientService, private router: Router) {

  }

  ngOnInit() {
    window.scroll(0, 0)
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.clientService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(response => {
        showSuccess(
          () => this.router.navigate(['/']),
          "Connexion réussie, vous êtes maintenant connecté à votre compte");
      });
    }
  }

}
