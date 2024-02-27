import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPaymentComponent } from './appointment-payment.component';

describe('AppointmentPaymentComponent', () => {
  let component: AppointmentPaymentComponent;
  let fixture: ComponentFixture<AppointmentPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentPaymentComponent]
    });
    fixture = TestBed.createComponent(AppointmentPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
