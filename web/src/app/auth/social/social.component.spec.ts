import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialComponent } from './social.component';
import {MaterialModules} from "../../shared/layout/material.modules";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SocialComponent', () => {
  let component: SocialComponent;
  let fixture: ComponentFixture<SocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModules, RouterTestingModule, HttpClientTestingModule],
      declarations: [ SocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
