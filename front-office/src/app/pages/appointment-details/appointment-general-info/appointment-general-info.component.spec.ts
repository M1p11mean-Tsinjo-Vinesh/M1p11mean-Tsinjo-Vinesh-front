import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentGeneralInfoComponent } from './appointment-general-info.component';

describe('AppointmentGeneralInfoComponent', () => {
  let component: AppointmentGeneralInfoComponent;
  let fixture: ComponentFixture<AppointmentGeneralInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentGeneralInfoComponent]
    });
    fixture = TestBed.createComponent(AppointmentGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
