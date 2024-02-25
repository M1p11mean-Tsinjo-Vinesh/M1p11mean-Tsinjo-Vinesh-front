import {UserDTO} from "../data/dto/user.dto";
import {ServiceProps} from "../../components/common-components/service-card/service-card.component";

type AppStore = {
  user: UserDTO,
  services: ServiceProps[]
}

export default AppStore;