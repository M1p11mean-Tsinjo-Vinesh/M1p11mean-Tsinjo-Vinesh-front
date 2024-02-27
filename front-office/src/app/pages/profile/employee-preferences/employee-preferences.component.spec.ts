import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePreferencesComponent } from './employee-preferences.component';

describe('EmployeePreferencesComponent', () => {
  let component: EmployeePreferencesComponent;
  let fixture: ComponentFixture<EmployeePreferencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeePreferencesComponent]
    });
    fixture = TestBed.createComponent(EmployeePreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
