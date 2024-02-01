import { Component } from '@angular/core';
import {GetterFn, InputList, SortParam} from "@common-components/interfaces";
import {ICRUDService} from "@common-components/services/crud/interfaces";
import {HttpClient} from "@angular/common/http";
import {CrudService} from "../../services/base-crud";
import {Validators} from "@angular/forms";
import {CONTACT_REGEX} from "../../../utils/RegexUtils";

@Component({
  selector: 'app-user',
  templateUrl: '../../templates/crud.template.html',
  styleUrls: []
})
export class UserComponent {

    title = "Gestion des utilisateurs";
    criteria = {}

    inputs: InputList = {
      email: {
        label: "Email de l'utilisateur",
        validators: [Validators.required, Validators.email]
      },
      firstName: {
        label: "Nom",
        validators: Validators.required
      },
      lastName: {
        label: "Prénom",
        validators: Validators.required
      },
      phone: {
        label: "Numéro de télephone",
        validators: Validators.pattern(CONTACT_REGEX)
      }
    }

    titles = ["Email", "FirstName", "LastName", "PhoneNumber"]

    getters: GetterFn[] = [
      row => row.email,
      row => row.firstName,
      row => row.lastName,
      row => row.phone
    ]

    sorts: SortParam = {
      "Email": "email"
    }

    service !: ICRUDService;

    constructor(private http: HttpClient) {
      this.service = new CrudService("users", http);
    }

}