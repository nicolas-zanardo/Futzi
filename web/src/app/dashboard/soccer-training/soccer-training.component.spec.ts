import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerTrainingComponent } from './soccer-training.component';
import {MaterialModules} from "../../shared/layout/material.modules";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('SoccerTrainingComponent', () => {
  let component: SoccerTrainingComponent;
  let fixture: ComponentFixture<SoccerTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoccerTrainingComponent ],
      imports: [
        MaterialModules,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoccerTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
