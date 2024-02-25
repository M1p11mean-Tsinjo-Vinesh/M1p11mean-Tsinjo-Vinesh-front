import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpBannerComponent } from './hp-banner.component';

describe('HpBannerComponent', () => {
  let component: HpBannerComponent;
  let fixture: ComponentFixture<HpBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HpBannerComponent]
    });
    fixture = TestBed.createComponent(HpBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
