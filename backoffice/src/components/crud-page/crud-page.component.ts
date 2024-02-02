import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CrudModalComponent} from "./crud-modal/crud-modal.component";
import {askConfirmation, showSuccess, startApiCall} from "../services/sweet-alert.util";
import {ObserverElt, ObserverObject} from "../services/util";
import {CRUDModalData, GetterFn, InputList, RowAction, SortParam, SortResult} from "../interfaces";
import {ListCheckboxComponent} from "../list-checkbox/list-checkbox.component";
import {ICRUDService} from "../services/crud/interfaces";

@Component({
  selector: 'app-crud-page',
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.scss']
})
export class CrudPageComponent {

  @Input() showCheckBox: boolean = false;
  @Input() showAddButton : boolean = true;
  @Input() showFilterButton: boolean = true;
  @Output() emitChecked : EventEmitter<any[]> = new EventEmitter<any[]>();

  private _service!: ICRUDService;

  @Input() set service (input: ICRUDService) {
    if (input) {
      this._service = input;
      this.fetchList();
    }
  }

  get service() {
    return this._service;
  }

  /** title of the page */
  @Input() title!: string;

  private _criteria!: InputList;

  @Input() set criteria(input: InputList) {
    if (!input || Object.keys(input).length == 0) {
      this.showFilterButton = false;
    }
    this._criteria = input;
  }

  get criteria() {
    return this._criteria;
  }

  @Input() inputs!: InputList;

  /** titles of the columns to be shown on the list */
  @Input() titles!: string[];

  /** functions to get each value of the columns on the list */
  @Input() getters!: GetterFn[]

  @Input() sorts!: SortParam;

  /** css class for inputs */
  @Input() inputClass !: string;

  @Input() offset = 10;

  @Input() set defaultParams (val: any) {
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

  @Input() set validActionType  (val: string[]) {
    this._validActionTypes = val;
    this.rowActions = this.defaultRowActions.filter(action => action.type && this._validActionTypes.indexOf(action.type) >= 0)
    console.log(this.rowActions);
  }

  @ViewChild("list") list!: ListCheckboxComponent;

  constructor (public dialog: MatDialog) {}

  delete (row: any) {
    startApiCall(close => this.service.delete(row.id).subscribe(ObserverObject(() => {
      close()
      this.fetchList();
    })))
  }

  pageChange(e: any) {
    this.params.page = e.pageIndex + 1;
    this.fetchList();
  }

  fetchList () {
    const params = this.params;
    params.offset = this.offset;
    if (this.list) {
      this.list.checkedList = [];
    }
    startApiCall(close => {
      this.service.findAllWithParams(params).subscribe(ObserverElt(res => {
        this.res = res;
        close();
      }))
    })
  }

  edit (row: any) {
    this._openModal({
      title: "Modification",
      inputs: this.inputs,
      value: row,
      service: this._service,
      method: this._service.update,
      next: this._onSuccess,
      init: row
    });
  }

  search () {
    this._openModal({
      title: "Recherche",
      inputs: this.criteria,
      value: this.params,
      next: (res: any) => {
        if (!(res && res !== "cancel")) return;
        Object.keys(res).forEach(key =>{
          if (!res[key]) {
            delete res[key]
          }
        })
        this.params = res;
        this.fetchList();
      }
    });
  }

  add () {
    this._openModal({
      title: "Enregistrement",
      inputs: this.inputs,
      service: this._service,
      method: this._service.create,
      next: this._onSuccess,
      inputClass: ""
    });
  }

  private _onSuccess =  (res: any) => {
    return res !== "cancel" && showSuccess(() => this.fetchList())
  }


  private _openModal (data: CRUDModalData) {
    const dialogRef = this.dialog.open(CrudModalComponent, {
      data: {...data, inputClass: this.inputClass},
      maxWidth: "600px"
    });
    dialogRef.afterClosed().subscribe(data.next);
  }

  sort(event: SortResult) {
    this.params = (this.params || {});
    this.params.column = event.field;
    this.params.method = event.method;
    this.fetchList();
  }
}
