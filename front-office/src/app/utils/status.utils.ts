import {EApointmentStatus} from "../data/enum/appointmentStatus.enum";

export function getStatusBadge(status: EApointmentStatus) {
  switch (status) {
    case EApointmentStatus.PENDING:
      return "badge-primary"
    case EApointmentStatus.VALIDATED:
      return "badge-info"
    case EApointmentStatus.CANCELED:
      return "badge-danger"
    case EApointmentStatus.PAID:
      return "badge-success"
    default:
      return "badge-secondary"
  }
}