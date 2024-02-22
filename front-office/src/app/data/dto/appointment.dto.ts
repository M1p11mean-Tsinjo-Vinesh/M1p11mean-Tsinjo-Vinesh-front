import {EApointmentStatus} from "../enum/appointmentStatus.enum";

export type AppointmentDto = {
  appointmentDate: Date;
  client: {
    name: string;
    email: string;
  },
  status: EApointmentStatus
  estimatedDuration: number,
  estimatedPrice: number
}

export type AppointmentSubmitDto = {
    appointmentDate: string;
    elements: {
        employee: string;
        service: string;
    }[]
}