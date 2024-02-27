import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit {
  images = [
    'assets/img/beauty/image-1.jpg',
    'assets/img/beauty/image-2.jpg',
    'assets/img/beauty/image-3.jpg',
  ]

  private fragment!: string;

  constructor(private router: Router) {
  }

  ngAfterViewInit() {
    const key = this.router.url.split("/").pop();
    const element = document.getElementById(key);
    window.scroll(0, element.offsetTop - 112)
  }

  ngOnInit() {
  }
}
