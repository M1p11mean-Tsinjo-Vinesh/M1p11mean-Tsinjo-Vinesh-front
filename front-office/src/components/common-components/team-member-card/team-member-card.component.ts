import {Component, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import AppStore from "../../../app/store/Appstore";
import {ClientService} from "../../../app/services/client/client.service";

export interface TeamMemberProps {
  _id: string
  image: string
  firstName: string
  lastName: string
  email: string
  phone: string
  employeeType: string
}


@Component({
  selector: 'app-team-member-card',
  templateUrl: './team-member-card.component.html',
  styleUrls: ['./team-member-card.component.css']
})
export class TeamMemberCardComponent {

  value = 0;

  @Input({
    required: true
  }) member!: TeamMemberProps;

  constructor(
    private store: Store<AppStore>,
    private clientService: ClientService
  ) {
  }

  ngOnInit() {
    this.store.subscribe(({user}) => {
      this.value = (user.favoriteEmployees.includes(this.member._id) ? 1 : 0);
    });
  }

  onStarClick() {
    if(!this.value) {
      this.clientService.addEmployeeToFavorites(this.member._id);
    }
    else {
      this.clientService.removeEmployeeToFavorites(this.member._id);
    }
  }

}
