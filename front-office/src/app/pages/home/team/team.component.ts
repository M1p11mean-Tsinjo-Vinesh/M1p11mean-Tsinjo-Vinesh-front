import {Component, OnInit} from '@angular/core';
import {TeamMemberProps} from "../../../../components/common-components/team-member-card/team-member-card.component";
import {Store} from "@ngrx/store";
import AppStore from "../../../store/Appstore";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  members: TeamMemberProps[] = [];

  constructor(private store: Store<AppStore>) {
  }

  ngOnInit() {
    this.store.subscribe(({members}) => {
      this.members = members.list;
    })
  }

}
