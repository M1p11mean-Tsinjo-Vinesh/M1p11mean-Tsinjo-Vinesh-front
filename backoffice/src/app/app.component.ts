import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {IconSetService} from '@coreui/icons-angular';
import {iconSubset} from './icons/icon-subset';
import {Subscription} from "rxjs";
import {EventBusService} from "./services/eventBus/event-bus.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  title = "m1p11mean-Tsinjo-Vinesh";
  eventBusSub?: Subscription;
  constructor(
    private router: Router,
    private iconSetService: IconSetService,
    private eventBusService: EventBusService,
  ) {
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
    this.eventBusSub = this.eventBusService.on('logout', () => {
      console.log('logout event received');
      this.router.navigate(['/login']);
      localStorage.removeItem('user');
    });
  }
}
