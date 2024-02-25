import {createReducer, on} from "@ngrx/store";
import {clearUser, setUser} from "./user.action";
import {UserDTO} from "../../data/dto/user.dto";

const USER_KEY = "user";

export const savedUser =  localStorage.getItem(USER_KEY);

const noIdentityUser: UserDTO =  {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  token: ""
};

export const initialState: UserDTO = savedUser ? JSON.parse(savedUser) : noIdentityUser;

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, user) => {
    const newUserData = {...state, ...user};
    localStorage.setItem(USER_KEY, JSON.stringify(newUserData));
    return newUserData;
  }),
  on(clearUser, state => {
    localStorage.removeItem(USER_KEY);
    return {...noIdentityUser};
  })
);