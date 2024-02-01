import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InputProps, RowAction} from "../interfaces";
import {MatDialog} from "@angular/material/dialog";
import {EditableModalComponent} from "./editable-modal/editable-modal.component";
import {EditableData} from "./interfaces";

@Component({
    selector: 'app-list-editable', templateUrl: './list-editable.component.html', styleUrls: ['./list-editable.component.scss']
})
export class ListEditableComponent {


    /** inputs for adding or modifying elements */
    @Input() inputs!: { [key: string]: InputProps };

    /** list props **/
    @Input() titles!: string[];
    @Input() title !: string;
    @Input() getters!: any[];

    /** output for every data changes **/
    @Output() emitData: EventEmitter<any[]> = new EventEmitter<any[]>();

    @Input() push: ((list: any[], newElement: any) => any[]) = (list, newElement) => {
        list.push(newElement);
        return list;
    };

    data: any[] = [];
    sorts = {}
    actions: RowAction[] = [{
        color: "warn", icon: "delete", onclick: (row, i) => {
            this.data.splice(i, 1);
            this.data = [...this.data];
            this.emit();
        }
    }];

    constructor(private dialog: MatDialog) {
    }

    add() {
        this.openModal({
            title: "Ajout", inputs: this.inputs, default: {}
        }, (res: any) => {
            if (res !== "cancel") {
                this.data = [...this.push(this.data, res)];
                this.emit();
            }
        });
    }

    emit () {
        this.emitData.emit(this.data);
    }

    openModal(data: EditableData, next: any) {
        const ref = this.dialog.open(EditableModalComponent, {
            data: data, disableClose: true
        });
        ref.afterClosed().subscribe(next);
    }

}
