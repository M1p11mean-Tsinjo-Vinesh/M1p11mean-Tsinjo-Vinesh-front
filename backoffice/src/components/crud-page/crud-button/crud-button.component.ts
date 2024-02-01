import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-crud-button',
  templateUrl: './crud-button.component.html',
  styleUrls: ['./crud-button.component.scss']
})
export class CrudButtonComponent {
  @Input({required: true}) text!: string;
  @Input({required: true}) icon!: string;
  @Input() color : string = "primary";
  @Input() variant?: "ghost" | "outline";
}
