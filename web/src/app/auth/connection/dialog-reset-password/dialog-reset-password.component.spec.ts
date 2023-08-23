import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResetPasswordComponent } from './dialog-reset-password.component';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MaterialModules} from "../../../shared/layout/material.modules";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('DialogResetPasswordComponent', () => {
  let component: DialogResetPasswordComponent;
  let fixture: ComponentFixture<DialogResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModules, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [ DialogResetPasswordComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
