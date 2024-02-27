import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { defaultPageGuard } from './default-page.guard';

describe('defaultPageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => defaultPageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
