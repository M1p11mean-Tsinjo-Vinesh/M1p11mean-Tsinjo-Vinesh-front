import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RowAction, SortParam, SortResult} from "../interfaces";
import {MatTableDataSource} from "@angular/material/table";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  private _data !: any[];
  private _titles !: string[];
  titlesCopy !: string[];

  /**
   * object that register each ordering key of each title,
   * SortParam at src/app/common-components/interfaces.ts
   */
  @Input() sorts !: SortParam;

  /**
   * list of actions for each row
   */
  @Input() actions !: RowAction[];

  /** functions to get each value of the columns on the list */
  @Input() getters!: ((item: any) => any)[];

  /** function to call on row click */
  @Input() onRowClick?: (row: any) => any;

  /** output for sorting */
  @Output() sort: EventEmitter<SortResult> = new EventEmitter<SortResult>();
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

  click(row: any) {
    if (this.actions) return;
    if (this.onRowClick) this.onRowClick(row);
  }

  sortChange(sortResult: Sort) {
    const methods: {[key: string]: 1 | -1} = {"ASC": 1, "DESC": -1, "": 1}
    let result: SortResult = {
      field: sortResult.active,
      method: methods[sortResult.direction.toUpperCase()]
    }
    this.sort.emit(result);
  }

  getSorted (title: string) {
    let keys = Object.keys(this.sorts)
    let i = keys.indexOf(title);
    if (i < 0) return undefined;
    return this.sorts[keys[i]];
  }

}
