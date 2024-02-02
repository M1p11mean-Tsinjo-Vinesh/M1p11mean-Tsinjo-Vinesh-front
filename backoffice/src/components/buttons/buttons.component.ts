/**
 * ButtonsComponent represents a reusable component for rendering a set of buttons.
 *
 * @remarks
 * This component supports various button configurations, including text, icon, color, and variant.
 * It also allows handling click events, with an optional confirmation dialog for certain buttons.
 *
 * @example
 * ```html
 * <app-buttons [buttons]="buttonList" (clicked)="handleButtonClick($event)"></app-buttons>
 * ```
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { askConfirmation } from "../services/sweet-alert.util";

/**
 * Defines the properties for a button within the ButtonsComponent.
 */
export interface ButtonProps {
  text: string;
  icon: string;
  color: string;
  variant?: "ghost" | "outline";
  askConfirmation?: boolean;
  onclick: () => any;
}

/**
 * ButtonsComponent is responsible for rendering and handling interactions with a set of buttons.
 */
@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {

  /** Input property representing an array of ButtonProps for rendering buttons. */
  @Input() buttons!: ButtonProps[];

  /** Output event emitter triggered when a button is clicked. */
  @Output() clicked: EventEmitter<ButtonProps> = new EventEmitter<ButtonProps>();

  /**
   * Handles the click event for a button, invoking the associated callback function.
   * If the button requires confirmation, a confirmation dialog is shown before execution.
   *
   * @param button - The button for which the click event is triggered.
   */
  onclick(button: ButtonProps) {
    if (!button.askConfirmation) {
      button.onclick();
    } else {
      // Show a confirmation dialog before executing the button's action.
      askConfirmation(() => {
        button.onclick();
      });
    }
    // Emit the clicked event with the button that was clicked.
    this.clicked.emit(button);
  }
}
