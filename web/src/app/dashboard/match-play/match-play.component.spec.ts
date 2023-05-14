import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPlayComponent } from './match-play.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MaterialModules} from "../../shared/layout/material.modules";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('MatchPlayComponent', () => {
  let component: MatchPlayComponent;
  let fixture: ComponentFixture<MatchPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MaterialModules,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule],
      declarations: [ MatchPlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
