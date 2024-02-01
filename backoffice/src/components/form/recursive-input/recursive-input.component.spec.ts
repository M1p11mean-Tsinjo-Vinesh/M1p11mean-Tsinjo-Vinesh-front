import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveInputComponent } from './recursive-input.component';

describe('RecursiveInputComponent', () => {
  let component: RecursiveInputComponent;
  let fixture: ComponentFixture<RecursiveInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecursiveInputComponent]
    });
    fixture = TestBed.createComponent(RecursiveInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
