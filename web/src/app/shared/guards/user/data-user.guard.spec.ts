import { TestBed } from '@angular/core/testing';

import { DataUserGuard } from './data-user.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ConnectionComponent} from "../../../auth/connection/connection.component";

describe('DataUserGuard', () => {
  let guard: DataUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'connexion', component: ConnectionComponent },
      ])],
    });
    guard = TestBed.inject(DataUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
