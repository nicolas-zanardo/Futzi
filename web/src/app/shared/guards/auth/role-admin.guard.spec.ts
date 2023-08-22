import { TestBed } from '@angular/core/testing';

import { RoleAdminGuard } from './role-admin.guard';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ConnectionComponent} from "../../../auth/connection/connection.component";

describe('RoleAdminGuard', () => {
  let guard: RoleAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([
        { path: 'connexion', component: ConnectionComponent },
      ])]
    });
    guard = TestBed.inject(RoleAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
