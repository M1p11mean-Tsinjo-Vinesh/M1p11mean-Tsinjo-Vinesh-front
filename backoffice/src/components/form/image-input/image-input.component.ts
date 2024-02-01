import {Component, Input, OnInit} from '@angular/core';
import {InputCommon} from "../input-common.class";
import {InputProps} from "../../interfaces";

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent extends InputCommon implements OnInit {
  @Input() props !: InputProps;

  ngOnInit() {
    this.form.get(this.key)?.setValue(undefined);
  }
}
