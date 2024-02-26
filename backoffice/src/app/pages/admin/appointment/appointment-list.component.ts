import {Component, ViewChild} from '@angular/core';
import {extract, extractAndPipe, GetterFn, InputList, RowAction, SortParam} from "@common-components/interfaces";
import {ICRUDService} from "@common-components/services/crud/interfaces";
import {HttpClient} from "@angular/common/http";
import {CrudService} from "../../../services/base-crud";
import {DatePipe, DecimalPipe} from "@angular/common";
import {CrudPageComponent} from "@common-components/crud-page/crud-page.component";
import {askConfirmation} from "@common-components/services/sweet-alert.util";
import {Router} from "@angular/router";
import {DurationPipe} from "../../../pipe/Duration.pipe";
import {getStatusBadge} from "../../../../utils/status.utils";
import {AppointmentStatusPipe} from "../../../pipe/AppointmentStatus.pipe";
import {Validators} from "@angular/forms";
import {EApointmentStatus} from "../../../enum/appointmentStatus.enum";

@Component({
  selector: 'app-appointment-list',
	template: `
		<app-crud-page
			[title]="title"
			[inputs]="{}"
			[titles]="titles"
			[getters]="getters"
			[sorts]="sorts"
			[service]="service"
			[rowActions]="rowActions"
      [showAddButton]="false"
      [showFilterButton]="true"
      [criteria]="criteria"
			#crudPageComponent
		/>
	`,
  styleUrls: []
})
export class AppointmentListComponent {

	title = "Liste des rendez-vous";

	titles: string[] = ["Id", "Date", "Client", "Statut"]
	getters: GetterFn[] = [
		extract("_id"),
		extractAndPipe("date", this.datePipe),
    row => row.client.name,
		row => `<c-badge [color]="${getStatusBadge(row.status)}">${this.appointmentStatusPipe.transform(row.status)}</c-badge>`,
	]

	service!: ICRUDService;

	@ViewChild("crudPageComponent") crudPageComponent !: CrudPageComponent;

	rowActions: RowAction[] = [
		{
			color: "primary",
			icon: "read_more",
			onclick: async (row) => await this.router.navigate(["management", "rendez-vous", "details", row._id], {
        state: row
      }),
			type: "edit"
		},
	];

  sorts: SortParam = {
    Date: "date",
    Statut: "status"
  }

  clientInput = {
    label: "Client",
    type: "text",
  }
  statusInput = {
    label: "Statut",
    searchKey: "value",
    options: Object.keys(EApointmentStatus).map((key, value) => ({value: value, text: this.appointmentStatusPipe.transform(value)})),
  }

  criteria: InputList = {
    "eq:client.name": this.clientInput,
    "eq:status": this.statusInput
  }

	constructor(
		private decimalPipe: DecimalPipe,
    private datePipe: DatePipe,
    private durationPipe: DurationPipe,
    private appointmentStatusPipe: AppointmentStatusPipe,
		private router: Router,
		private http: HttpClient) {
		this.service = new CrudService("manager/appointments", http);
	}


}
