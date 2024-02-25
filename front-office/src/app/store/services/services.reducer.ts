import {createReducer, on} from "@ngrx/store";
import {clearServices, setServices} from "./services.action";


export const servicesReducer = createReducer(
  [],
  on(setServices, (state, user) => [...user]),
  on(clearServices, state => [])
);