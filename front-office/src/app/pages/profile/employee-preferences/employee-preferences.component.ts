import { Component } from '@angular/core';
import {ServiceProps} from "../../../../components/common-components/service-card/service-card.component";
import {Store} from "@ngrx/store";
import AppStore from "../../../store/Appstore";
import {TeamMemberProps} from "../../../../components/common-components/team-member-card/team-member-card.component";

@Component({
  selector: 'app-employee-preferences',
  templateUrl: './employee-preferences.component.html',
  styleUrls: ['./employee-preferences.component.css']
})
export class EmployeePreferencesComponent {

  members: TeamMemberProps[] = [];

  constructor(private store: Store<AppStore>) {
  }

  ngOnInit() {
    this.store.subscribe(({user, members}) => {
      this.members = members.list.filter(member => user.favoriteEmployees?.includes(member._id));
    })
  }

}
