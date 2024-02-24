import {createAction, props} from "@ngrx/store";

export interface AppNotification {
  count: number
}

export const setNotification = createAction('[Notification] Set Notification', props<AppNotification>());
export const clearNotification = createAction('[Notification] Clear Notification');