import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import AppStore from "../../../store/Appstore";
import {ServiceProps} from "../../../../components/common-components/service-card/service-card.component";

@Component({
  selector: 'app-service-preferences',
  templateUrl: './service-preferences.component.html',
  styleUrls: ['./service-preferences.component.css']
})
export class ServicePreferencesComponent implements OnInit{

  services: ServiceProps[] = [];

  constructor(private store: Store<AppStore>) {
  }

  ngOnInit() {
    this.store.subscribe(({user, services}) => {
      this.services = services.list.filter(service => user.favoriteServices?.includes(service._id));
    })
  }


}
