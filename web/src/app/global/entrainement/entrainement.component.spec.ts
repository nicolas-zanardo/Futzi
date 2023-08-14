import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrainementComponent } from './entrainement.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MaterialModules} from "../../shared/layout/material.modules";

describe('EntrainementComponent', () => {
  let component: EntrainementComponent;
  let fixture: ComponentFixture<EntrainementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModules],
      declarations: [ EntrainementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrainementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
