import {Component, Input} from '@angular/core';

export interface Category {
  id: number,
  name: string
}

@Component({
  selector: 'app-category-btn',
  templateUrl: './category-btn.component.html',
  styleUrls: ['./category-btn.component.scss']
})
export class CategoryBtnComponent {
  @Input({required: true}) category!: Category;
  @Input() on: boolean  = false;
}
