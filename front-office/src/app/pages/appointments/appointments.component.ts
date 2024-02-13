import { Component } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {
  filteredAppointments = [
    {
      date: '2024-02-01 08:00',
      title: 'Rendez-vous 1',
      appointmentDetails: [
        {
          service: {
            name: "Coiffure"
          },
        },
        {
          service: {
            name: "Manucure"
          },
        },
      ],
      status: "PENDING"
    },
    {
      date: '2024-02-01 08:00',
      title: 'Rendez-vous 1',
      appointmentDetails: [
        {
          service: {
            name: "Coiffure"
          },
        },
        {
          service: {
            name: "Manucure"
          },
        },
      ],
      status: "PENDING"
    },
    {
      date: '2024-02-01 08:00',
      title: 'Rendez-vous 1',
      appointmentDetails: [
        {
          service: {
            name: "Coiffure"
          },
        },
        {
          service: {
            name: "Manucure"
          },
        },
      ],
      status: "PENDING"
    },
    {
      date: '2024-02-01 08:00',
      title: 'Rendez-vous 1',
      appointmentDetails: [
        {
          service: {
            name: "Coiffure"
          },
        },
        {
          service: {
            name: "Manucure"
          },
        },
      ],
      status: "PENDING"
    },
    {
      date: '2024-02-01 08:00',
      title: 'Rendez-vous 1',
      appointmentDetails: [
        {
          service: {
            name: "Coiffure"
          },
        },
        {
          service: {
            name: "Manucure"
          },
        },
      ],
      status: "PENDING"
    },
    {
      date: '2024-02-01 08:00',
      title: 'Rendez-vous 1',
      appointmentDetails: [
        {
          service: {
            name: "Coiffure"
          },
        },
        {
          service: {
            name: "Manucure"
          },
        },
      ],
      status: "PENDING"
    },
  ];
}
