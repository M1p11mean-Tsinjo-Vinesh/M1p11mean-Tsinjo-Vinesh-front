import {Component, OnInit} from '@angular/core';
import {LinkProps} from "../../shared/navbar/header-link/header-link.component";


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  links: LinkProps[] = [
    {
      link: "/profile/edit",
      name: "Informations personnelles"
    },
    {
      link: "/profile/favoris/services",
      name: "Services favoris"
    },
    {
      link: "/profile/favoris/employees",
      name: "Employés favoris"
    },
    {
      link: "/profile/historique-rendez-vous",
      name: "Historiques RDV"
    },
    {
      link: "/se-deconnecter",
      name: "Se déconnecter"
    }
  ];

  ngOnInit() {
    window.scroll(0, 0)
  }
}
