import {createAction, props} from "@ngrx/store";
import {TeamMemberProps} from "../../../components/common-components/team-member-card/team-member-card.component";

export const setTeamMembers = createAction('[TeamMembers] Set TeamMembers', props<{ list: TeamMemberProps[] }>());
export const clearTeamMembers = createAction('[TeamMembers] Clear TeamMembers');