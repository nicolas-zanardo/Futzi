import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteMatchPlayComponent } from './dialog-delete-match-play.component';
import {MaterialModules} from "../../../shared/layout/material.modules";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

describe('DialogDeleteMatchPlayComponent', () => {
  let component: DialogDeleteMatchPlayComponent;
  let fixture: ComponentFixture<DialogDeleteMatchPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModules],
      declarations: [ DialogDeleteMatchPlayComponent ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { myData: {} } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteMatchPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
