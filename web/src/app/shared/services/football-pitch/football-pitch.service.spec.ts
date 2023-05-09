import { TestBed } from '@angular/core/testing';

import { FootballPitchService } from './football-pitch.service';

describe('FootballPitchService', () => {
  let service: FootballPitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FootballPitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
