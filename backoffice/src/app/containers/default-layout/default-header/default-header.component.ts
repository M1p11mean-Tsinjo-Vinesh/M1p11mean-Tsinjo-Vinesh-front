import {Component, Input, OnInit} from '@angular/core';

import {HeaderComponent} from '@coreui/angular';
import {User} from "@common-components/avatar/avatar.component";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  user!: User;

  constructor() {
    super();
  }

  ngOnInit() {
    this.user = {
      name: "Sinel Vinesh",
      path: "/assets/images/Vinesh.jpg "
    };
  }


  logout(){
    window.location.href = "/#/login";
    //TODO: Logout
  }

  @Input() sidebarId: string = "sidebar";

}
