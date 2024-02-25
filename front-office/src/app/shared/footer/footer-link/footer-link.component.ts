import {Component, Input} from '@angular/core';
import {LinkProps} from "../../navbar/header-link/header-link.component";

@Component({
  selector: 'app-footer-link',
  templateUrl: './footer-link.component.html',
  styleUrls: ['./footer-link.component.css']
})
export class FooterLinkComponent {

  @Input({
    required: true
  }) public link!: LinkProps;

}
