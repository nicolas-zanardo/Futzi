import { TestBed } from '@angular/core/testing';

import { OpposingTeamService } from './opposing-team.service';

describe('OpposingTeamService', () => {
  let service: OpposingTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpposingTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
