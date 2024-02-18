import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  standalone: true,
  name: 'appointmentStatus'
})
export class AppointmentStatusPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0:
        return "En attente";
      case 10:
        return "Validé";
      case -10:
        return "Refusé";
      case 20:
        return "Payé";
      default:
        return "Inconnu";
    }
  }
}