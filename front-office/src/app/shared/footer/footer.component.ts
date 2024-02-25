import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceProps} from "../../../components/common-components/service-card/service-card.component";
import {Store} from "@ngrx/store";
import AppStore from "../../store/Appstore";
import appstore from "../../store/Appstore";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    date : Date = new Date();
    services: ServiceProps[];

    constructor(
      private store: Store<AppStore>,
      private router: Router ) {}

    ngOnInit() {
      this.store.subscribe(appstore => {
        this.services = appstore.services.list;
      })
    }
    getPath(){
      return this.router.url;
    }
    ngOnDestroy() {
    
    }
}
