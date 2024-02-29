import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import AppStore from "../../../app/store/Appstore";
import {ClientService} from "../../../app/services/client/client.service";
import {UserDTO} from "../../../app/data/dto/user.dto";
import {Router} from "@angular/router";

export interface ServiceProps {
  _id: string
  name: string
  pictureUrls: string[]
  duration: number
  price: number
  commission: number,
  discountInformation?: {
    value: number,
    discountValue: number
  }
}

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent implements OnInit {

  value = 0;
  user?: UserDTO;

  @Input({
    required: true
  }) service!: ServiceProps;


  constructor(
    private store: Store<AppStore>,
    private clientService: ClientService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.store.subscribe(({user}) => {
      if(user.exp > 0) {
        this.value = (user.favoriteServices?.includes(this.service._id) ? 1 : 0);
        this.user = user;
      }
      else {
        this.user = undefined;
      }
    });
  }


  onStarClick() {
    if(!this.user) {
      this.router.navigate(["/login"]);
      return;
    }
    if(!this.value) {
      this.clientService.addServiceToFavorites(this.service._id);
    }
    else {
      this.clientService.removeServiceToFavorites(this.service._id);
    }
  }
}
