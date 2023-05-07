import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanUserComponent } from './ban-user.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MaterialModules} from "../../shared/layout/material.modules";

describe('BanUserComponent', () => {
  let component: BanUserComponent;
  let fixture: ComponentFixture<BanUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModules],
      declarations: [ BanUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
