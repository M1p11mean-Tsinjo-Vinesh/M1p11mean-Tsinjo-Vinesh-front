import {createReducer, on} from "@ngrx/store";
import {AppNotification, clearNotification, setNotification} from "./notification.action";

const NotificationKey = "notification";

export const savedNotificationProps =  localStorage.getItem(NotificationKey);

const defaultNotificationProps: AppNotification =  {
  count: 0
};

export const initialState: AppNotification = savedNotificationProps ? JSON.parse(savedNotificationProps) : defaultNotificationProps;

export const notificationReducer = createReducer(
  initialState,
  on(setNotification, (state, user) => {
    const newNotificationProps = {...state, ...user};
    localStorage.setItem(NotificationKey, JSON.stringify(newNotificationProps));
    return newNotificationProps;
  }),
  on(clearNotification, state => {
    localStorage.removeItem(NotificationKey);
    return {...defaultNotificationProps};
  })
);