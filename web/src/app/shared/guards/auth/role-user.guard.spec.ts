import { TestBed } from '@angular/core/testing';

import { RoleUserGuard } from './role-user.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('RoleUserGuard', () => {
  let guard: RoleUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    guard = TestBed.inject(RoleUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
