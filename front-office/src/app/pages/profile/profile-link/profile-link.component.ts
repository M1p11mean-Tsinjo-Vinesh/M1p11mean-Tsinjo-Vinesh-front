import {Component, Input} from '@angular/core';
import {LinkProps} from "../../../shared/navbar/header-link/header-link.component";

@Component({
  selector: 'app-profile-link',
  templateUrl: './profile-link.component.html',
  styleUrls: ['./profile-link.component.css']
})
export class ProfileLinkComponent {

  @Input({
    required: true
  }) link!: LinkProps;

}
