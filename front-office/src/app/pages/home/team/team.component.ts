import {Component, OnInit} from '@angular/core';
import {TeamMemberProps} from "../../../../components/common-components/team-member-card/team-member-card.component";
import {TeamMemberService} from "../../../services/team-member/team-member.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  members: TeamMemberProps[] = [];

  constructor(private service: TeamMemberService) {
  }

  ngOnInit() {
    this.service.findTeamMembers().subscribe(list => {
      this.members = list.map(member => {
        //TODO: update theses temporary photos when employees have photos
        member.image = [
          "https://res.cloudinary.com/dje2mveih/image/upload/v1708810354/assets/gallery-7_urlwlc.jpg",
          "https://res.cloudinary.com/dje2mveih/image/upload/v1708810354/assets/image-gallery-02_nsmzdx.jpg",
          "https://res.cloudinary.com/dje2mveih/image/upload/v1708810354/assets/image-gallery-03_kxlerz.jpg",
          "https://res.cloudinary.com/dje2mveih/image/upload/v1708810354/assets/image-gallery-01_wkbcky.jpg"
        ].at(Math.floor(Math.random() * 4));
        return member;
      });
    })
  }

}
