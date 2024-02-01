import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonToastComponent } from './common-toast.component';

describe('CommonToastComponent', () => {
  let component: CommonToastComponent;
  let fixture: ComponentFixture<CommonToastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonToastComponent]
    });
    fixture = TestBed.createComponent(CommonToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
