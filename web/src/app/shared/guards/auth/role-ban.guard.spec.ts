import { TestBed } from '@angular/core/testing';

import { RoleBanGuard } from './role-ban.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ConnectionComponent} from "../../../auth/connection/connection.component";

describe('RoleBanGuard', () => {
  let guard: RoleBanGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'connection', component: ConnectionComponent },
      ])]
    });
    guard = TestBed.inject(RoleBanGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
