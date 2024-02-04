import {UserDTO} from "../../dto/user.dto";
import {createReducer, on} from "@ngrx/store";
import {clearUser, setUser} from "./user.action";

export const initialState:UserDTO = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: ""
}

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, user) => ({...state, ...user})),
  on(clearUser, state => ({...initialState}))
);