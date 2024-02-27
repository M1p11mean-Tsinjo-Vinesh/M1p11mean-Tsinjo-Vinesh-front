import {Component, OnInit} from '@angular/core';
import {LinkProps} from "./header-link/header-link.component";
import {faBars, faX} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  links: LinkProps[] = [
    {
      name: "Accueil",
      link: ["accueil", "presentation"]
    },
    {
      name: "À propos",
      link: ["accueil", "a-propos"]
    },
    {
      name: "Services",
      link: ["accueil", "services"]
    },
    {
      name: "Rendez-vous",
      link: ["accueil", "rendez-vous"]
    }
  ];

  mobileMenuActive = false;

  ngOnInit(): void {
  }


  protected readonly faBars = faBars;
  protected readonly faX = faX;
}
