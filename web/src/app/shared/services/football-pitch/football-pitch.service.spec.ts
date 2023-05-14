import { TestBed } from '@angular/core/testing';

import { FootballPitchService } from './football-pitch.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('FootballPitchService', () => {
  let service: FootballPitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FootballPitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
