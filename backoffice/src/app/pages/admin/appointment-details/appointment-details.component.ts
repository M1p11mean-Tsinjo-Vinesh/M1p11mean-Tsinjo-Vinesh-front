import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppointmentDto} from "../../../dto/appointment.dto";
import {getStatusBadge} from "../../../../utils/status.utils";
import {AppointmentService} from "../../../services/appointment/appointment.service";
import {EApointmentStatus} from "../../../enum/appointmentStatus.enum";
import {askConfirmation, showError, showSuccess} from "@common-components/services/sweet-alert.util";


@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.scss']
})
export class AppointmentDetailsComponent {
  protected readonly getStatusBadge = getStatusBadge;
  protected readonly EApointmentStatus = EApointmentStatus;
  appointment: AppointmentDto | undefined;
  displayedColumns: string[] = ["service","employee","duration","price"];

  constructor(
    private activatedRoute: ActivatedRoute,
    private appointmentService: AppointmentService
  ) {
  }

  ngOnInit() {
    const appointmentId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.appointmentService.findById(appointmentId).subscribe((appointment) => {
      this.appointment = appointment;
    })
  }

  goBack() {
    window.history.back();
  }

  showValidationModal() {
    askConfirmation(() => {
      this.validateAppointment(this.appointment!._id);
    })
  }

  validateAppointment(appointmentId: string) {
    this.appointmentService.validateAppointment(appointmentId).subscribe({
      next: () => {
        showSuccess(() => {
          this.appointment!.status = EApointmentStatus.VALIDATED;
        },'Rendez-vous validé avec succès.');
      },
      error: (error) => {
        showError("Une erreur est survenue lors de la validation du rendez-vous. Veuillez réessayer.")
      }
    })
  }

  showDenyModal() {
    askConfirmation(() => {
      this.denyAppointment(this.appointment!._id);
    })
  }

  denyAppointment(appointmentID: string) {
    this.appointmentService.denyAppointment(appointmentID).subscribe({
      next: () => {
        showSuccess(() => {
          this.appointment!.status = EApointmentStatus.CANCELED;
        },'Rendez-vous refusé avec succès.');
      },
      error: () => {
        showError("Une erreur est survenue lors de l'annulation du rendez-vous. Veuillez réessayer.")
      }
    })
  }
}
