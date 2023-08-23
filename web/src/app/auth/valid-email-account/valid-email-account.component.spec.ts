import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidEmailAccountComponent } from './valid-email-account.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NavigateModule} from "../../shared/component/navigate/navigate.module";

describe('ValidEmailAccountComponent', () => {
  let component: ValidEmailAccountComponent;
  let fixture: ComponentFixture<ValidEmailAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, NavigateModule],
      declarations: [ ValidEmailAccountComponent ],
      providers: [
        { provide: MatSnackBarModule, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidEmailAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
