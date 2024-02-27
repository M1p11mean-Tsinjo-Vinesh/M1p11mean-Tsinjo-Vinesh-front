import {ServiceDTO} from "./service.dto";

export type OfferDto = {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  pictureUrls: string[];
  services: ServiceDTO[]
}
