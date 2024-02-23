import {UserDTO} from "../dto/user.dto";
import {AppNotification} from "./notification/notification.action";

type AppStore = {
  user: UserDTO,
  notification: AppNotification
}

export default AppStore;