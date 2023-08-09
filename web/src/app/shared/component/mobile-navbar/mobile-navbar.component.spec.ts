import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavbarComponent } from './mobile-navbar.component';
import {MaterialModules} from "../../layout/material.modules";

describe('MobileNavbarComponent', () => {
  let component: MobileNavbarComponent;
  let fixture: ComponentFixture<MobileNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModules],
      declarations: [ MobileNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
