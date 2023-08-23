import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidResetPasswordComponent } from './valid-reset-password.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NavigateModule} from "../../shared/component/navigate/navigate.module";
import {MatcherValidatorModule} from "../../shared/component/matcher/matcher-validator.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ValidResetPasswordComponent', () => {
  let component: ValidResetPasswordComponent;
  let fixture: ComponentFixture<ValidResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        NavigateModule,
        MatcherValidatorModule,
        HttpClientTestingModule
      ],
      declarations: [ ValidResetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
