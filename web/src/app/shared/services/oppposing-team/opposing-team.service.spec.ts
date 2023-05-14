import { TestBed } from '@angular/core/testing';

import { OpposingTeamService } from './opposing-team.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('OpposingTeamService', () => {
  let service: OpposingTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(OpposingTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
