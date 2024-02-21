import {ServiceDto} from "./service.dto";
import {EmployeeDTO} from "./employee.dto";

export type AppointmentDetailsDto = {
  _id?: string;
  appointmentId?: string;
  employee?: EmployeeDTO,
  service: ServiceDto,
  status?: number;
  startDate: string;
  endDate: string;
}
