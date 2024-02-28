import {UserDTO} from "../data/dto/user.dto";
import {ServiceProps} from "../../components/common-components/service-card/service-card.component";
import {TeamMemberProps} from "../../components/common-components/team-member-card/team-member-card.component";
import {AppNotification} from "./notification/notification.action";

type AppStore = {
  user: UserDTO,
  services: { list: ServiceProps[] },
  members: { list: TeamMemberProps[] },
  notification: AppNotification
}

export default AppStore;