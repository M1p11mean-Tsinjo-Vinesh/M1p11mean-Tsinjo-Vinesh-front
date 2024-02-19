import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UniqueMailValidator} from "../../validators/unique-mail.validator";
import {passwordConfirmationValidator} from "../../validators/password-confirmation.validator";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarRegular} from "@fortawesome/free-regular-svg-icons";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm = this.formBuilder.group({
      firstname: [
        '',
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
          ],
        },
      ],
      lastname: [
        '',
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
          ],
        },
      ],
      email: [
        '',
        {
          updateOn: 'blur',
          validators: [
            Validators.required,
          ],
          asyncValidators: [this.uniqueMailValidator.validate.bind(this.uniqueMailValidator)],
        },
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^(0|\\+261)[0-9]{9}$'),
        ]
      ],
      password:  [
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
      favoriteEmployees: [
        []
      ],
      favoriteServices: [
        []
      ],
    }, {validators: passwordConfirmationValidator})
  employeeDataSource = [
    {
      fullName: "Rakoto Jean",
      isFavorite: true,
    },
    {
      fullName: "Rakoto Jeanne",
      isFavorite: false,
    },
    {
      fullName: "Rajao Jean",
      isFavorite: true,
    },
  ]
  employeeDisplayedColumns = ["fullName", "isFavorite"]
  serviceDataSource = [
{
      name: "Brushing",
      isFavorite: true,
    },
    {
      name: "Coupe",
      isFavorite: false,
    },
    {
      name: "Coloration",
      isFavorite: true,
    },
  ]
  serviceDisplayedColumns = ["name", "isFavorite"]
    constructor(
      private formBuilder: FormBuilder,
      private uniqueMailValidator: UniqueMailValidator,
    ) { }

    ngOnInit() {}
  
  onSubmit() {
  
  }
  
  protected readonly faStar = faStar;
  protected readonly faStarRegular = faStarRegular;
}
