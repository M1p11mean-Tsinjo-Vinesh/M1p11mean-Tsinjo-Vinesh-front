import {Component, OnInit} from '@angular/core';
import {LinkProps} from "./header-link/header-link.component";
import {faBars, faHamburger, faX} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  links: LinkProps[] = [
    {
      name: "Accueil",
      link: "/home"
    },
    {
      name: "À propos",
      link: "#about-us"
    },
    {
      name: "Services",
      link: "#services"
    },
    {
      name: "Rendez-vous",
      link: "#rendez-vous"
    }
  ];

  mobileMenuActive = false;

  ngOnInit(): void {
  }


  protected readonly faBars = faBars;
  protected readonly faX = faX;
}
