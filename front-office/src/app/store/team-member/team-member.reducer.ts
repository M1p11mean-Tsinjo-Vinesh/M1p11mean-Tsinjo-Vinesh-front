import {createReducer, on} from "@ngrx/store";
import {clearTeamMembers, setTeamMembers} from "./team-member.action";


export const teamMemberReducer = createReducer(
  {list: []},
  on(setTeamMembers, (state, members) => ({...members})),
  on(clearTeamMembers, state => ({list: []}))
);