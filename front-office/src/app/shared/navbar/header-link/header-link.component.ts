import {Component, Input} from '@angular/core';

export interface HeaderLinkProps {
  name: string,
  link?: string
}

@Component({
  selector: 'app-header-link',
  templateUrl: './header-link.component.html',
  styleUrls: ['./header-link.component.css']
})
export class HeaderLinkComponent {

  @Input({
    required: true
  }) public link!: HeaderLinkProps;

}
