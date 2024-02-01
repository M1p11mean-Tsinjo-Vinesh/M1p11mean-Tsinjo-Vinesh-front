import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {GetterFn, RowAction} from "../interfaces";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  private _data !: any[];
  private _titles !: string[];
  titlesCopy !: string[];
  allChecked: boolean = false;
  checkedList: any[] = [];

  @Output() emitChecked: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() showCheckBox: boolean = false;

  /** list of actions for each row */
  @Input() actions : RowAction[] = [];

  /** functions to get each value of the columns on the list */
  @Input() getters!: GetterFn[];

  /** function to call on row click */
  @Output() onRowClick = new EventEmitter<any>();

  dataSource : MatTableDataSource<any> = new MatTableDataSource();

  /** the list of the object that will be displayed on the table*/
  @Input() set data (val: any[]) {
    this._data = val;
    this.dataSource.data = val;
  }

  /** titles of each colum */
  @Input() set titles (val: string[]) {
    this.titlesCopy = [...val];
    this._titles = [...val, "Actions"];
  }

  get data () {
    return this._data;
  }


  get titles () {
    return this._titles;
  }

  getTitles(): string[] {
    return ["checkboxes", ...this.titles];
  }

  checkAll() {
    if (this.allChecked) {
      this.checkedList = [];
    }
    else {
      this.checkedList = [...this.data];
    }
    this.allChecked = !this.allChecked;
    this.emit();
  }

  checkIndex( element: any) {
    if (this.isChecked(element)) {
      this.checkedList.splice(this.checkedList.indexOf(element), 1);
    }
    else {
      this.checkedList.push(element);
    }
    this.emit();
  }

  emit () {
    this.emitChecked.emit(this.checkedList);
  }

  isChecked(element: any) {
    return this.checkedList.indexOf(element) >= 0;
  }


}
