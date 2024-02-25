import {Injectable} from '@angular/core';
import {ReadService} from "../base-crud";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataDto} from "../../data/dto/data.dto";
import {TeamMemberProps} from "../../../components/common-components/team-member-card/team-member-card.component";

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService extends ReadService {

  constructor(private http: HttpClient) {
    super("employees", http)
  }

  findTeamMembers(): Observable<TeamMemberProps[]> {
    return new Observable<TeamMemberProps[]>(subscriber => {
      const findAllObservable = super.findAll<DataDto<TeamMemberProps[]>>();
      findAllObservable.subscribe(response => {
        subscriber.next(response.data);
        subscriber.complete();
      })
    });
  }
}
