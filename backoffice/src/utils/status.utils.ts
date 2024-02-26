import {EApointmentStatus} from "../app/enum/appointmentStatus.enum";


export function getStatusBadge(status: EApointmentStatus) {
  switch (status) {
    case EApointmentStatus.PENDING:
      return "primary"
    case EApointmentStatus.VALIDATED:
      return "info"
    case EApointmentStatus.CANCELED:
      return "danger"
    case EApointmentStatus.PAID:
      return "success"
    default:
      return "secondary"
  }
}
