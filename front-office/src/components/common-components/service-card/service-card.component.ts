import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import AppStore from "../../../app/store/Appstore";
import {ClientService} from "../../../app/services/client/client.service";

export interface ServiceProps {
  _id: string
  name: string
  pictureUrls: string[]
  duration: number
  price: number
  commission: number
}

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent implements OnInit {

  value = 0;

  @Input({
    required: true
  }) service!: ServiceProps;


  constructor(
    private store: Store<AppStore>,
    private clientService: ClientService
  ) {
  }

  ngOnInit() {
    this.store.subscribe(({user}) => {
      this.value = (user.favoriteServices.includes(this.service._id) ? 1 : 0);
    });
  }


  onStarClick() {
    if(!this.value) {
      this.clientService.addServiceToFavorites(this.service._id);
    }
    else {
      this.clientService.removeServiceToFavorites(this.service._id);
    }
  }
}
