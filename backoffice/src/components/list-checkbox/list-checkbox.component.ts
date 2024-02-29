import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ListComponent} from "../list/list.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-list-checkbox',
  templateUrl: './list-checkbox.component.html',
  styleUrls: ['./list-checkbox.component.scss']
})
export class ListCheckboxComponent extends ListComponent {

  allChecked: boolean = false;
  checkedList: any[] = [];

  @Output() emitChecked: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Input() showCheckBox: boolean = true;

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

  protected readonly NgIf = NgIf;
}
