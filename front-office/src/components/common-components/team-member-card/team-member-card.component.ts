import {Component, Input} from '@angular/core';

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

  @Input({
    required: true
  }) member!: TeamMemberProps;

}
