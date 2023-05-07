import { TestBed } from '@angular/core/testing';

import { SoccerTrainingService } from './soccer-training.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SoccerTrainingService', () => {
  let service: SoccerTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SoccerTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
