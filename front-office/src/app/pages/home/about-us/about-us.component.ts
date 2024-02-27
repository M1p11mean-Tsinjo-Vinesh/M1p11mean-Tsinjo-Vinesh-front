import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import AppStore from "../../../store/Appstore";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  count = 0;

  constructor(private store:Store<AppStore>) {
  }


  ngOnInit() {
    this.store.subscribe(({members}) => {
      this.count = members.list.length;
    })
  }


}
