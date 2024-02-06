import { Component } from '@angular/core';
import {extract, GetterFn, InputList, SelectProps, SortParam} from "@common-components/interfaces";
import {Validators} from "@angular/forms";
import {CONTACT_REGEX} from "../../../utils/RegexUtils";
import {ICRUDService} from "@common-components/services/crud/interfaces";
import {HttpClient} from "@angular/common/http";
import {CrudService} from "../../services/base-crud";

@Component({
  selector: 'app-employee-crud',
  templateUrl: '../../templates/crud.template.html',
  styleUrls: []
})
export class EmployeeCrudComponent {

  title = "Liste des employés";

  criteria: InputList = {};

  inputs: InputList = {
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
    employeeType: {
      label: "Autorisation",
      options: ["EMPLOYEE", "MANAGER"].map(val => ({key: val, value: val})),
      getValue: self => self.key,
      getText: self => self.value,
      autoComplete: false,
      validators: [Validators.required],
      default: "EMPLOYEE",
      searchKey: "value"
    } as SelectProps
  }

  titles: string[] = ["Nom", "Prénom", "Email", "Tel", "Autorisation"]
  getters: GetterFn[] = [
    extract("firstName"),
    extract("lastName"),
    extract("email"),
    extract("phone"),
    extract("employeeType")
  ]

  sorts: SortParam = {}
  service!: ICRUDService;

  constructor(private http: HttpClient) {
    this.service = new CrudService("employees", http);
  }
}
