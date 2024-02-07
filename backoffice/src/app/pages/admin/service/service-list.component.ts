import {Component, ViewChild} from '@angular/core';
import {extract, extractAndPipe, GetterFn, InputList, RowAction, SortParam} from "@common-components/interfaces";
import {ICRUDService} from "@common-components/services/crud/interfaces";
import {HttpClient} from "@angular/common/http";
import {CrudService} from "../../../services/base-crud";
import {DecimalPipe} from "@angular/common";
import {CrudPageComponent} from "@common-components/crud-page/crud-page.component";
import {askConfirmation} from "@common-components/services/sweet-alert.util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-service-list',
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
export class ServiceListComponent {

	title = "Liste des services";
	urlToAddPage = ["management", "service", "ajout"];

	titles: string[] = ["Nom", "Duration", "Prix(Ar)", "Commission(%)"]
	getters: GetterFn[] = [
		extract("name"),
		extractAndPipe("duration", this.decimalPipe),
		extractAndPipe("price", this.decimalPipe),
		row => this.decimalPipe.transform(row.commission * 100)
	]

	sorts: SortParam = {}
	service!: ICRUDService;

	@ViewChild("crudPageComponent") crudPageComponent !: CrudPageComponent;

	rowActions: RowAction[] = [
		{
			color: "primary",
			icon: "edit",
			onclick: async (row) => await this.router.navigate(["management", "service", "modification", row._id], {
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
		private http: HttpClient) {
		this.service = new CrudService("services", http);
	}


}
