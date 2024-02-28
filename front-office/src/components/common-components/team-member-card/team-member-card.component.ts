import {Component, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import AppStore from "../../../app/store/Appstore";
import {ClientService} from "../../../app/services/client/client.service";
import {UserDTO} from "../../../app/data/dto/user.dto";
import {Router} from "@angular/router";

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
  user?: UserDTO;

  @Input({
    required: true
  }) member!: TeamMemberProps;

  constructor(
    private store: Store<AppStore>,
    private clientService: ClientService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.store.subscribe(({user}) => {
      if(user.exp > 0) {
        this.value = (user.favoriteEmployees?.includes(this.member._id) ? 1 : 0);
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
      this.clientService.addEmployeeToFavorites(this.member._id);
    }
    else {
      this.clientService.removeEmployeeToFavorites(this.member._id);
    }
  }

}
