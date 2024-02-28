import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import AppStore from "../../../store/Appstore";
import {UserDTO} from "../../../data/dto/user.dto";

@Component({
  selector: 'app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.css']
})
export class AppUserComponent implements OnInit {

  user?: UserDTO;

  constructor(
    private store: Store<AppStore>
  ) {
  }

  ngOnInit(): void {
    this.store.subscribe(({user}) => {
      if(user.exp > 0) this.user = user;
      else {
        this.user = undefined;
      }
    })
  }



}
