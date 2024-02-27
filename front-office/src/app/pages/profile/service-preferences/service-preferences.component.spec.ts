import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePreferencesComponent } from './service-preferences.component';

describe('ServicePreferencesComponent', () => {
  let component: ServicePreferencesComponent;
  let fixture: ComponentFixture<ServicePreferencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicePreferencesComponent]
    });
    fixture = TestBed.createComponent(ServicePreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
