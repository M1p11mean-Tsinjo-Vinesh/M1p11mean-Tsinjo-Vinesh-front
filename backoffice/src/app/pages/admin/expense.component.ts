import {Component} from '@angular/core';
import {extract, GetterFn, InputList, SelectProps, SortParam} from "@common-components/interfaces";
import {ICRUDService} from "@common-components/services/crud/interfaces";
import {HttpClient} from "@angular/common/http";
import {CrudService} from "../../services/base-crud";
import {Validators} from "@angular/forms";
import {monthInputCommon, monthList, months} from "../../../utils/Utils";
import {DecimalPipe} from "@angular/common";

export const expenses: any = {
  SALARY: "Salaire",
  RENT: "Location/Loyer",
  BUYING: "Achat",
  OTHER: "Autres"
}



@Component({
  selector: 'app-expense',
  templateUrl: '../../templates/crud.template.html',
  styleUrls: []
})
export class ExpenseComponent {

  title = "Gestion des dépenses";

  criteria: InputList = {};

  inputs: InputList = {
    year: {
      label: "Année",
      type: "number",
      validators: [Validators.required, Validators.min(0)],
      default: new Date().getFullYear()
    },
    month: {
      ...monthInputCommon,
      validators: [Validators.required, Validators.min(0), Validators.max(11)]
    },
    type: {
      label: "Type",
      searchKey: "value",
      options: Object.keys(expenses).map(key => ({value: key, text: expenses[key]})),
      getValue: extract("value"),
      getText: extract("text"),
      validators: Validators.required
    } as SelectProps,
    amount: {
      label: "Valeur",
      type: "number",
      validators: [Validators.required, Validators.min(0)]
    },
    description: {
      label: "Description",
      type: "text"
    }
  }

  titles: string[] = ["Année", "Mois", "Type", "Valeur", "Description"]
  getters: GetterFn[] = [
    extract("year"),
    obj => monthList[obj.month],
    obj => expenses[obj.type],
    obj => this.decimalPipe.transform(obj.amount) + " Ar",
    extract("description")
  ]

  sorts: SortParam = {}
  service!: ICRUDService;

  constructor(private http: HttpClient, private decimalPipe: DecimalPipe) {
    this.service = new CrudService("expenses", http);
  }

}
