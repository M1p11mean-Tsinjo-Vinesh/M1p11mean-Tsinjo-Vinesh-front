export type AppointmentDetailsDto = {
  _id: string;
  client: {
    _id: string;
    name: string;
    email: string;
  },
  appointmentId: string;
  employee: {
    _id: string;
    name: string;
    email: string;
  },
  service: {
    _id: string;
    name: string;
    pictureUrls: string[];
    duration: number;
    price: number;
    commission: number;
  },
  status: number;
  startDate: string;
}
