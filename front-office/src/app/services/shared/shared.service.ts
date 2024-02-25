import { Injectable } from '@angular/core';
import {ServicesService} from "../services/services.service";
import {Store} from "@ngrx/store";
import AppStore from "../../store/Appstore";
import {setServices} from "../../store/services/services.action";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private servicesService: ServicesService,
    private store: Store<AppStore>
  ) { }

  load() {
    this.servicesService.findServices().subscribe(list => {
      this.store.dispatch(setServices({list}));
    })
  }

}
