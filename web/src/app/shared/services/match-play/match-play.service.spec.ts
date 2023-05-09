import { TestBed } from '@angular/core/testing';

import { MatchPlayService } from './match-play.service';

describe('MatchPlayService', () => {
  let service: MatchPlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchPlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
