import {createReducer, on} from "@ngrx/store";
import {clearServices, setServices} from "./services.action";


export const servicesReducer = createReducer(
  {list: []},
  on(setServices, (state, services) => ({...services})),
  on(clearServices, state => ({list: []}))
);