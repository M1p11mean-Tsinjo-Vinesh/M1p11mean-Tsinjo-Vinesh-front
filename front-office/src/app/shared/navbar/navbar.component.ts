import {Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import {TMenuElement} from "../../types/TMenuElement";
import {ClientService} from "../../services/client/client.service";
import {faUser} from "@fortawesome/free-regular-svg-icons/faUser";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    
    userMenuElements: TMenuElement[] = [
    ]
    
    constructor(public location: Location, private router: Router, private clientService: ClientService) {
    }

    ngOnInit() {
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
        if (event instanceof NavigationStart) {
           if (event.url != this.lastPoppedUrl)
               this.yScrollStack.push(window.scrollY);
          // check if the user is connected
          if(!this.clientService.isConnected()) {
            this.userMenuElements = [
              {
                label: 'Connexion',
                link: '/login'
              },
              {
                label: 'Inscription',
                link: '/register'
              }
            ];
          } else {
            this.userMenuElements = [
              {
                label: 'Mon profil',
                link: '/user-profile'
              },
              {
                label: 'Mes rendez-vous',
                link: '/user-appointments'
              },
              {
                label: 'Déconnexion',
                link: '/logout',
                fn: () => {
                  this.clientService.logout().subscribe(() => {
                    this.router.navigate(['/home']);
                  })
                }
              }
            ];
          }
       } else if (event instanceof NavigationEnd) {
           if (event.url == this.lastPoppedUrl) {
               this.lastPoppedUrl = undefined;
               window.scrollTo(0, this.yScrollStack.pop());
           } else
               window.scrollTo(0, 0);
       }
     });
     this.location.subscribe((ev:PopStateEvent) => {
         this.lastPoppedUrl = ev.url;
     });
     
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if( titlee === '#/home' ) {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '#/documentation' ) {
            return true;
        }
        else {
            return false;
        }
    }
  
  protected readonly faUser = faUser;
}
