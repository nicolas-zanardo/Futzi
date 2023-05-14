import { TestBed } from '@angular/core/testing';

import { MatchPlayService } from './match-play.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('MatchPlayService', () => {
  let service: MatchPlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MatchPlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
