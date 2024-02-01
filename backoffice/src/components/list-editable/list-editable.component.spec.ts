import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEditableComponent } from './list-editable.component';

describe('ListEditableComponent', () => {
  let component: ListEditableComponent;
  let fixture: ComponentFixture<ListEditableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListEditableComponent]
    });
    fixture = TestBed.createComponent(ListEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
