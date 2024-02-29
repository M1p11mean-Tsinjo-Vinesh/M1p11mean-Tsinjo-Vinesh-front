import { Component } from '@angular/core';
import Swal from "sweetalert2";
import {bind} from "sockjs-client";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  waitingFor = 4;
  ngOnInit() {
   Swal.fire({
     title: 'Chargement...',
     allowOutsideClick: false,
     allowEscapeKey: false,
     willOpen() {
       Swal.showLoading()
     },
     showConfirmButton: false
   }).then()
  }

  close() {
   this.waitingFor--;
    if(this.waitingFor === 0) {
      Swal.close();
    }
  }

  protected readonly bind = bind;
}
