import {createAction, props} from "@ngrx/store";
import {UserDTO} from "../../data/dto/user.dto";

export const setUser = createAction('[User] Set User', props<UserDTO>());
export const clearUser = createAction('[User] Clear User');