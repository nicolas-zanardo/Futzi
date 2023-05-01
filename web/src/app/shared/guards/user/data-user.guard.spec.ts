import { TestBed } from '@angular/core/testing';

import { DataUserGuard } from './data-user.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DataUserGuard', () => {
  let guard: DataUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    guard = TestBed.inject(DataUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
