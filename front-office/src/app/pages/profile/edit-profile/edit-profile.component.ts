import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {passwordConfirmationValidator} from "../../../validators/password-confirmation.validator";
import {UserUpdateDTO} from "../../../data/dto/user.dto";
import {showSuccess} from "../../../../components/services/sweet-alert.util";
import {UniqueMailValidator} from "../../../validators/unique-mail.validator";
import {PreferencesService} from "../../../services/preferences/preferences.service";
import {ClientService} from "../../../services/client/client.service";
import {Store} from "@ngrx/store";
import AppStore from "../../../store/Appstore";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

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
    currentPassword: [
      ''
    ],
    password:  [
      '',
      [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$'),
      ]
    ],
    confirmPassword: [
      ''
    ],
  }, {validators: passwordConfirmationValidator})


  constructor(
    private formBuilder: FormBuilder,
    private uniqueMailValidator: UniqueMailValidator,
    private preferencesService: PreferencesService,
    private clientService: ClientService,
    private store: Store<AppStore>
  ) {
  }

  ngOnInit() {
    this.store.subscribe(({user}) => {
      this.profileForm.patchValue({
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        phone: user.phone,
      })
    })
  }


  onSubmit() {
    let userToUpdate: UserUpdateDTO = {
      firstName: this.profileForm.value.firstname,
      lastName: this.profileForm.value.lastname,
      email: this.profileForm.value.email,
      phone: this.profileForm.value.phone
    }
    if (this.profileForm.value.password) {
      userToUpdate = {
        ...userToUpdate,
        currentPassword: this.profileForm.value.currentPassword,
        password: this.profileForm.value.password,
        confirmPassword: this.profileForm.value.confirmPassword,
      }
    }
    this.clientService.updateUser(userToUpdate).subscribe(() => {
      showSuccess(
        () => {},
        "Profile mis à jour avec succès");
    })
  }

}
