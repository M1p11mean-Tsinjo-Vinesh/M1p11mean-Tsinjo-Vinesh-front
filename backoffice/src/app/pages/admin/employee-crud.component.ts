import { Component } from '@angular/core';
import {extract, GetterFn, InputList, SelectProps, SortParam} from "@common-components/interfaces";
import {Validators} from "@angular/forms";
import {CONTACT_REGEX} from "../../../utils/RegexUtils";
import {ICRUDService} from "@common-components/services/crud/interfaces";
import {HttpClient} from "@angular/common/http";
import {CrudService} from "../../services/base-crud";
import {askConfirmation} from "@common-components/services/sweet-alert.util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-crud',
  template: `
  <app-crud-page
    [title]="title"
    [criteria]="criteria"
    [inputs]="inputs"
    [titles]="titles"
    [getters]="getters"
    [sorts]="sorts"
    [service]="service"
    [urlCommandToAddPage]="urlToAddPage"
    [rowActions]="rowActions"
  />
  `,
  styleUrls: []
})
export class EmployeeCrudComponent {

  title = "Liste des employés";
  urlToAddPage = ["management", "employee", "ajout"];
  criteria: InputList = {};
  currentUserId: string = "";

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
  rowActions: any[] = [
    {
      color: "primary",
      icon: "edit",
      onclick: async (row: any) => await this.router.navigate(["management", "employee", row._id], {
        state: row
      }),
      type: "edit"
    },
    {
      color: "warn",
      icon: "delete",
      onclick: (row: any) => askConfirmation(() => this.service.delete(row)),
      visible: (row: any) => row._id !==this.currentUserId,
      type: "delete"
    }
  ]

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

  constructor(private http: HttpClient, private router: Router) {
    this.service = new CrudService("employees", http);
    const data = localStorage.getItem("user");
    if (data) {
      this.currentUserId = JSON.parse(data)._id;
    }
  }
}
