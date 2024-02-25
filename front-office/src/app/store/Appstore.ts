import {UserDTO} from "../data/dto/user.dto";
import {ServiceProps} from "../../components/common-components/service-card/service-card.component";

type AppStore = {
  user: UserDTO,
  services: { list: ServiceProps[] }
}

export default AppStore;