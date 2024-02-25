import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterLinkComponent } from './footer-link.component';

describe('FooterLinkComponent', () => {
  let component: FooterLinkComponent;
  let fixture: ComponentFixture<FooterLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterLinkComponent]
    });
    fixture = TestBed.createComponent(FooterLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
