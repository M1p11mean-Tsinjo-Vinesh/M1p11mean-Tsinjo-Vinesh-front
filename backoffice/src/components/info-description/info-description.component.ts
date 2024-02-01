import {Component, Input} from '@angular/core';
import {InfoDescriptionProps} from "../interfaces";

@Component({
  selector: 'app-info-description',
  templateUrl: './info-description.component.html',
  styleUrls: ['./info-description.component.scss']
})
export class InfoDescriptionComponent {
  @Input({required: true}) props!: InfoDescriptionProps;
}
