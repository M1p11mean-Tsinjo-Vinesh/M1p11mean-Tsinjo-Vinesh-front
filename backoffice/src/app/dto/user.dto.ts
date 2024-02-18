export type UserDTO = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  token: string;
  shifts?: {
    daysOfWeek: number[];
    startTime: string;
    endTime: string;
  }[]
}
