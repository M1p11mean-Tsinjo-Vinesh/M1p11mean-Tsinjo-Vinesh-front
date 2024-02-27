import {Component, ViewChild} from '@angular/core';
import {extract, extractAndPipe, GetterFn, RowAction, SortParam} from "@common-components/interfaces";
import {ICRUDService} from "@common-components/services/crud/interfaces";
import {HttpClient} from "@angular/common/http";
import {CrudService} from "../../../services/base-crud";
import {DatePipe, DecimalPipe} from "@angular/common";
import {CrudPageComponent} from "@common-components/crud-page/crud-page.component";
import {askConfirmation} from "@common-components/services/sweet-alert.util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-offer-list',
  template: `
		<app-crud-page
			[title]="title"
			[criteria]="{}"
			[urlCommandToAddPage]="urlToAddPage"
			[inputs]="{}"
			[titles]="titles"
			[getters]="getters"
			[sorts]="sorts"
			[service]="service"
			[rowActions]="rowActions"
			#crudPageComponent
		/>
	`,
  styleUrls: []
})
export class OfferListComponent {

  title = "Liste des Offres";
  urlToAddPage = ["management", "offre", "ajout"];

  titles: string[] = ["Nom", "Début", "Fin", "Description"]
  getters: GetterFn[] = [
    extract("name"),
    extractAndPipe("startDate", this.datePipe),
    extractAndPipe("endDate", this.datePipe),
    extract("description")
  ]

  sorts: SortParam = {}
  service!: ICRUDService;

  @ViewChild("crudPageComponent") crudPageComponent !: CrudPageComponent;

  rowActions: RowAction[] = [
    {
      color: "primary",
      icon: "edit",
      onclick: async (row) => await this.router.navigate(["management", "offre", "modification", row._id], {
        state: row
      }),
      type: "edit"
    },
    {
      color: "warn",
      icon: "delete",
      onclick: (row) => askConfirmation(() => this.crudPageComponent.delete(row)),
      type: "delete"
    }
  ];

  constructor(
    private decimalPipe: DecimalPipe,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe
    ) {
    this.service = new CrudService("offers", http);
  }


}
