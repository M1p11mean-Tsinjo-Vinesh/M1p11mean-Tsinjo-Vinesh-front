import {Component, EventEmitter, Input, Output} from '@angular/core';
import {askConfirmation} from "../services/sweet-alert.util";

export interface ButtonProps {
  text: string;
  icon: string;
  color: string;
  variant?: "ghost" | "outline";
  askConfirmation?: boolean;
  onclick: () => any
}


@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {

  @Input() buttons !: ButtonProps[];
  @Output() clicked : EventEmitter<ButtonProps> = new EventEmitter<ButtonProps>();

  onclick (button: ButtonProps) {
    if (!button.askConfirmation) {
      button.onclick();
    }
    else {
      askConfirmation(() => {
        button.onclick();
      })
    }
    this.clicked.emit(button);
  }

}
