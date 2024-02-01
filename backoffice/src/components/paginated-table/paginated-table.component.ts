import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {GetterFn, RowAction} from "../interfaces";

@Component({
  selector: 'app-paginated-table',
  templateUrl: './paginated-table.component.html',
  styleUrls: ['./paginated-table.component.scss']
})
export class PaginatedTableComponent  {

  @Input() count !: number;
  @Input() pageSize !: number;
  @Output() page = new EventEmitter<number>();

  // table attrs
  @Input() actions : RowAction[] = [];
  @Input() getters!: GetterFn[];
  @Input() titles !: string[];
  @Input() data: any[] = [];
  @Input() showCheckBox: boolean = false;


  // checkbox attr
  @Output() emitChecked: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() onRowClick = new EventEmitter<any>();

  pageChange(e: PageEvent) {
    this.page.emit(e.pageIndex + 1);
  }


}
