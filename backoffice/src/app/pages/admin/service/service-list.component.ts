import {Component} from '@angular/core';
import {extract, extractAndPipe, GetterFn, InputList, SortParam} from "@common-components/interfaces";
import {ICRUDService} from "@common-components/services/crud/interfaces";
import {HttpClient} from "@angular/common/http";
import {CrudService} from "../../../services/base-crud";
import {DecimalPipe} from "@angular/common";

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
		/>
	`,
  styleUrls: []
})
export class ServiceListComponent {

	title = "Liste des services";
	urlToAddPage = ["management", "service", "ajout"];

	titles: string[] = ["Nom", "Duration", "Prix(Ar)", "Commission"]
	getters: GetterFn[] = [
		extract("name"),
		extractAndPipe("duration", this.decimalPipe),
		extractAndPipe("price", this.decimalPipe),
		extractAndPipe("commission", this.decimalPipe)
	]

	sorts: SortParam = {}
	service!: ICRUDService;

	constructor(
		private decimalPipe: DecimalPipe,
		private http: HttpClient) {
		this.service = new CrudService("services", http);
	}
}
