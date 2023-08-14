import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchComponent } from './match.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MaterialModules} from "../../shared/layout/material.modules";

describe('MatchComponent', () => {
  let component: MatchComponent;
  let fixture: ComponentFixture<MatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModules],
      declarations: [ MatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
