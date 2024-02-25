import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCountChartComponent } from './appointment-count-chart.component';

describe('AppointmentCountChartComponent', () => {
  let component: AppointmentCountChartComponent;
  let fixture: ComponentFixture<AppointmentCountChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentCountChartComponent]
    });
    fixture = TestBed.createComponent(AppointmentCountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
