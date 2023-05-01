import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionComponent } from './inscription.component';
import {MaterialModules} from "../../shared/layout/material.modules";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('InscriptionComponent', () => {
  let component: InscriptionComponent;
  let fixture: ComponentFixture<InscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MaterialModules,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      declarations: [ InscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
