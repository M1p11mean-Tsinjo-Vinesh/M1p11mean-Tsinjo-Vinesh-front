import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  images = [
    'assets/img/beauty/image-1.jpg',
    'assets/img/beauty/image-2.jpg',
    'assets/img/beauty/image-3.jpg',
  ]
  ngOnInit() {}
}
