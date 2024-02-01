import {Component, Input} from '@angular/core';
import {InputProps} from "../../interfaces";
import {InputCommon} from "../input-common.class";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent extends InputCommon{
  @Input() props !: InputProps;
}
