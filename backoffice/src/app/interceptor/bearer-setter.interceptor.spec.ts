import { TestBed } from '@angular/core/testing';

import { BearerSetterInterceptor } from './bearer-setter.interceptor';

describe('BearerSetterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BearerSetterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BearerSetterInterceptor = TestBed.inject(BearerSetterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
