import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ServiceProps} from "../../../components/common-components/service-card/service-card.component";
import {Store} from "@ngrx/store";
import AppStore from "../../store/Appstore";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    date : Date = new Date();
    services: ServiceProps[];

    hours: string[] = [
      'Lundi : 8:00 - 17:00',
      'Mardi : 8:00 - 17:00',
      'Mercredi : 8:00 - 17:00',
      'Jeudi : 8:00 - 17:00',
      'Vendredi : 8:00 - 17:00',
      'Samedi : 8:00 - 17:00',
      'Dimanche : 8:00 - 11:00',
    ];

    constructor(
      private store: Store<AppStore>,
      private router: Router ) {}

    ngOnInit() {
      this.store.subscribe(appstore => {
        this.services = appstore.services.list;
      })
    }

}
