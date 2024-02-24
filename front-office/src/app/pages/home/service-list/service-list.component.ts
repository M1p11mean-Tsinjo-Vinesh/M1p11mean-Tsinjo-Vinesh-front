import {Component, OnInit} from '@angular/core';
import {ServiceProps} from "../../../../components/common-components/service-card/service-card.component";
import {ServicesService} from "../../../services/services/services.service";

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {


  services: ServiceProps[] = [];

  constructor(private service: ServicesService) {
  }

  ngOnInit() {
    console.log("SERVICES")
    this.service.findServices().subscribe(list => {
      console.log(list);
      this.services = list;
    })
  }


}
