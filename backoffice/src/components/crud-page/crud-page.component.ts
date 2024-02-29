import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { CrudModalComponent } from "./crud-modal/crud-modal.component";
import { askConfirmation, showSuccess, startApiCall } from "../services/sweet-alert.util";
import { ObserverElt, ObserverObject } from "../services/util";
import { CRUDModalData, GetterFn, InputList, RowAction, SortParam, SortResult } from "../interfaces";
import { ListCheckboxComponent } from "../list-checkbox/list-checkbox.component";
import { ICRUDService } from "../services/crud/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-crud-page',
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.scss']
})
export class CrudPageComponent {

  @Input() showCheckBox: boolean = false;
  @Input() showAddButton: boolean = true;
  @Input() showFilterButton: boolean = true;
  @Output() emitChecked: EventEmitter<any[]> = new EventEmitter<any[]>();
	@Input() urlCommandToAddPage?: string[];

  private _service!: ICRUDService;

  // Setter for the 'service' input property
  @Input() set service(input: ICRUDService) {
    if (input) {
      this._service = input;
      this.fetchList(); // Fetch initial list when 'service' is set
    }
  }

  // Getter for the 'service' input property
  get service() {
    return this._service;
  }

  /** title of the page */
  @Input() title!: string;

  private _criteria!: InputList;

  // Setter for the 'criteria' input property
  @Input() set criteria(input: InputList) {
    if (!input || Object.keys(input).length == 0) {
      this.showFilterButton = false;
    }
    this._criteria = input;
  }

  // Getter for the 'criteria' input property
  get criteria() {
    return this._criteria;
  }

  @Input() inputs!: InputList;

  /** titles of the columns to be shown on the list */
  @Input() titles!: string[];

  /** functions to get each value of the columns on the list */
  @Input() getters!: GetterFn[];

  @Input() sorts!: SortParam;

  /** css class for inputs */
  @Input() inputClass!: string;

  @Input() offset = 10;

  // Setter for the 'defaultParams' input property
  @Input() set defaultParams(val: any) {
    this.params = val;
  }

  res: any = {};
  params: any = {}

  defaultRowActions: RowAction[] = [
    {
      color: "primary",
      icon: "edit",
      onclick: (row) => this.edit(row),
      type: "edit"
    },
    {
      color: "warn",
      icon: "delete",
      onclick: (row) => askConfirmation(() => this.delete(row)),
      type: "delete"
    }
  ];

  @Input() rowActions: RowAction[] = this.defaultRowActions;

  private _validActionTypes = ["edit", "delete"];

  // Setter for the 'validActionType' input property
  @Input() set validActionType(val: string[]) {
    this._validActionTypes = val;
    // Filter row actions based on valid action types
    this.rowActions = this.defaultRowActions.filter(action => action.type && this._validActionTypes.indexOf(action.type) >= 0)
  }

  @Input()
  listFilter?: (row: any) => boolean;

  @ViewChild("list") list!: ListCheckboxComponent;

  constructor(
		private router: Router,
		public dialog: MatDialog) {
	}

  // Delete method for a row
  delete(row: any) {
    startApiCall(close => this.service.delete(row._id).subscribe(ObserverObject(() => {
      close()
      this.fetchList();
    })))
  }

  // Callback method for page change event
  pageChange(e: any) {
    this.params.page = e.pageIndex + 1;
    this.fetchList();
  }

  // Fetch list based on current parameters
  fetchList() {
    const params = this.params;
    params.offset = this.offset;
    if (this.list) {
      this.list.checkedList = [];
    }
    startApiCall(close => {
      // Call the CRUD service to fetch data with current parameters
      this.service.findAllWithParams(params).subscribe(ObserverElt(res => {
        if (this.listFilter) {
          res.elements = res.elements.filter(this.listFilter)
          res.count = res.elements.length;
        }
        this.res = res;
        close();
      }))
    })
  }

  // Edit method for a row
  edit(row: any) {
    this._openModal({
      title: "Modification",
      inputs: this.inputs,
      value: row,
      method: this._service.update.bind(this._service),
      next: this._onSuccess,
      init: row
    });
  }

  // Method to open the modal for searching
  search() {
    this._openModal({
      title: "Recherche",
      inputs: this.criteria,
      value: this.params,
      next: (res: any) => {
        if (!(res && res !== "cancel")) return;
        // Remove empty criteria before sending for search
        Object.keys(res).forEach(key => {
          if (!res[key]) {
            delete res[key]
          }
        })
        this.params = res;
        this.fetchList();
      }
    });
  }

  // Method to open the modal for adding a new entry
  add() {
		if(this.urlCommandToAddPage) {
			this.router.navigate(this.urlCommandToAddPage);
			return;
		}
    this._openModal({
      title: "Enregistrement",
      inputs: this.inputs,
      method: this._service.create.bind(this._service),
      next: this._onSuccess,
      inputClass: ""
    });
  }

  // Success callback method after a CRUD operation
  private _onSuccess = (res: any) => {
    return res !== "cancel" && showSuccess(() => this.fetchList())
  }

  // Method to open the CRUD modal
  private _openModal(data: CRUDModalData) {
    const dialogRef = this.dialog.open(CrudModalComponent, {
      data: { ...data, inputClass: this.inputClass },
      maxWidth: "600px"
    });
    dialogRef.afterClosed().subscribe(data.next);
  }

  // Method to handle sorting of the list
  sort(event: SortResult) {
    this.params = (this.params || {});
    this.params.column = event.field;
    this.params.method = event.method;
    this.fetchList();
  }
}
