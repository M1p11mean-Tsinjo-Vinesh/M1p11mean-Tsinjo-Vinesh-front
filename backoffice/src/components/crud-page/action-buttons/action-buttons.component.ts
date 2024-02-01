import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent {
  @Output() reinitialize: EventEmitter<any> = new EventEmitter<any>();
  @Output() validate: EventEmitter<any> = new EventEmitter<any>();
}
