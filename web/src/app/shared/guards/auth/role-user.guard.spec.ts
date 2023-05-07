import { TestBed } from '@angular/core/testing';

import { RoleUserGuard } from './role-user.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ConnectionComponent} from "../../../auth/connection/connection.component";


describe('RoleUserGuard', () => {
  let guard: RoleUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'connection', component: ConnectionComponent },
      ])]
    });
    guard = TestBed.inject(RoleUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
