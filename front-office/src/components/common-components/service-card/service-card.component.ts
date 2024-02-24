import {Component, Input} from '@angular/core';

export interface ServiceProps {
  _id: string
  name: string
  pictureUrls: string[]
  duration: number
  price: number
  commission: number
}

@Component({
  selector: 'app-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.css']
})
export class ServiceCardComponent {

  @Input({
    required: true
  }) service!: ServiceProps;

}
