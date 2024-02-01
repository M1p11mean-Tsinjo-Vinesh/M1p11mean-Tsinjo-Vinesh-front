import {Component, OnInit} from '@angular/core';
import {navItems} from './_nav';
import {INavData} from "@coreui/angular";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {

  public navItems: INavData[] = [];

  ngOnInit(): void {
    this.navItems = navItems;
  }

}
