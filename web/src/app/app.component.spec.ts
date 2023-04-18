import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import { RouterOutlet } from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {NavbarComponent} from "./shared/component/navbar/navbar.component";
import {MaterialModules} from "./shared/layout/material.modules";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModules
      ],
      declarations: [
        AppComponent,
        NavbarComponent
      ],
      providers: [
        RouterOutlet,
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


});
