import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import AppStore from "../../../store/Appstore";
import {take} from "rxjs";
import {FormActionProps, InputList} from "@common-components/interfaces";
import {Validators} from "@angular/forms";
import {CONTACT_REGEX} from "../../../../utils/RegexUtils";

export interface UserEditableInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  editProfileInputs: InputList = {
    firstName: {
      label: "Nom",
      type: "text",
      validators: Validators.required
    },
    lastName: {
      label: "Prénom",
      type: "text",
      validators: Validators.required
    },
    email: {
      label: "Email",
      type: "email",
      validators: [Validators.email, Validators.required]
    },
    phone: {
      label: "Numéro de téléphone",
      type: "text",
      validators: [Validators.required, Validators.pattern(CONTACT_REGEX)]
    },
    currentPassword: {
      label: "Mot de passe actuel",
      type: "password",
      validators: Validators.required
    },
    password: {
      label: "Nouveau de passe",
      type: "password",
      validators: Validators.required
    },
    confirmPassword: {
      label: "Confirmez votre mot de passe",
      type: "password",
      validators: Validators.required
    }
  };

  connectedUser?: UserEditableInfo;
  editFormActions: FormActionProps[] = [
    {
      label: "Enregistrer mes modifications",
      color: "primary",
      validDataOnly: true
    },
    {
      label: "Retour",
      color: "",
      onClick: ()=> {} // TODO: add back link here
    }
  ];

  constructor(private store: Store<AppStore>) {
  }

  ngOnInit() {
    this.store.pipe().subscribe((appData: AppStore) => {
      const {user} = appData;
      this.connectedUser = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      }
    });
  }

}
