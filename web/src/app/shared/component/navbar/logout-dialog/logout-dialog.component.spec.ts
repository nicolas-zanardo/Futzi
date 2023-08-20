import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutDialogComponent } from './logout-dialog.component';
import {MaterialModules} from "../../../layout/material.modules";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

describe('LogoutDialogComponent', () => {
  let component: LogoutDialogComponent;
  let fixture: ComponentFixture<LogoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModules],
      declarations: [ LogoutDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { myData: {} } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
