import {Component, OnInit} from '@angular/core';
import {ServiceProps} from "../../../../components/common-components/service-card/service-card.component";
import {ServicesService} from "../../../services/services/services.service";
import {Store} from "@ngrx/store";
import AppStore from "../../../store/Appstore";

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {


  services: ServiceProps[] = [];

  constructor(private store: Store<AppStore>) {
  }

  ngOnInit() {
    this.store.subscribe(appStore => {
      this.services = appStore.services.list;
    })
  }


}
