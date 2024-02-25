import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitChartComponent } from './profit-chart.component';

describe('ProfitChartComponent', () => {
  let component: ProfitChartComponent;
  let fixture: ComponentFixture<ProfitChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfitChartComponent]
    });
    fixture = TestBed.createComponent(ProfitChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
