import {EApointmentStatus} from "../enum/appointmentStatus.enum";
import {AppointmentDetailsDto} from "./appointmentDetails.dto";

export type AppointmentDto = {
  _id: string;
  date: string;
  appointmentDate: string;
  client: {
    _id: string;
    name: string;
    email: string;
  };
  status: EApointmentStatus;
  estimatedPrice: number;
  estimatedDuration: number;
  comments: string[];
  elements: AppointmentDetailsDto[];

}
