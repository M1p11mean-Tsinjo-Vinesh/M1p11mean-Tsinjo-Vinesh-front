import {EApointmentStatus} from "../enum/appointmentStatus.enum";
import {AppointmentDetailsDto} from "./appointmentDetails.dto";

export type AppointmentDto = {
  _id?: string;
  appointmentDate: Date;
  client: {
    name: string;
    email: string;
  },
  status: EApointmentStatus
  estimatedDuration: number,
  estimatedPrice: number,
  comments?: string[],
  elements?: AppointmentDetailsDto[]
}

export type AppointmentSubmitDto = {
    appointmentDate: string;
    elements: {
        employee: string;
        service: string;
    }[]
}