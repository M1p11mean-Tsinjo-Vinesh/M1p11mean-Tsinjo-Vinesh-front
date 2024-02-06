import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import AppStore from "../../../store/Appstore";
import {UserDTO} from "../../../dto/user.dto";
import {take} from "rxjs";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  user!: UserDTO;

  constructor(private store: Store<AppStore>) {
  }

  ngOnInit() {
    this.store.pipe(take(1)).subscribe(console.log);
  }

}
