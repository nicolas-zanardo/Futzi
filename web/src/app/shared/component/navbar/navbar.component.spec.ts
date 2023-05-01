import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {environment} from "../../../../environments/environement.dev";
import {MaterialModules} from "../../layout/material.modules";
import {RouterTestingModule} from "@angular/router/testing";
import {AuthService} from "../../services/auth/auth.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModules, RouterTestingModule, HttpClientTestingModule],
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`should have as path img LOGO`, () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const app = fixture.componentInstance;
    expect(app.logo).toEqual(`${environment.images}LOGO_OSNY.png`);
  });
});
