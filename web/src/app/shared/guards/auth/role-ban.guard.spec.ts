import { TestBed } from '@angular/core/testing';

import { RoleBanGuard } from './role-ban.guard';

describe('RoleBanGuard', () => {
  let guard: RoleBanGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleBanGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
