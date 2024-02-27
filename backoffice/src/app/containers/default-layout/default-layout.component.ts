import {Component, OnInit} from '@angular/core';
import {navItems} from './_nav';
import {INavData} from "@coreui/angular";
import {UserService} from "../../services/user/user.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {

  public navItems: INavData[] = [];
  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    const user = this.userService.getUserFromLocalStorage();
    this.navItems = navItems;
    if (user.role === 'EMPLOYEE') {
      this.navItems = this.navItems.filter(item => item.name === 'Planning');
    }
  }

}
