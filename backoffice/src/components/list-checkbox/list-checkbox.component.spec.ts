import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCheckboxComponent } from './list-checkbox.component';

describe('ListCheckboxComponent', () => {
  let component: ListCheckboxComponent;
  let fixture: ComponentFixture<ListCheckboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCheckboxComponent]
    });
    fixture = TestBed.createComponent(ListCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
