import {createAction, props} from "@ngrx/store";
import {ServiceProps} from "../../../components/common-components/service-card/service-card.component";

export const setServices = createAction('[Services] Set Services', props<ServiceProps[]>());
export const clearServices = createAction('[Services] Clear Services');