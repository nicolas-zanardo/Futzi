import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteSoccerTrainingComponent } from './dialog-delete-soccer-training.component';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MaterialModules} from "../../../shared/layout/material.modules";

describe('DialogDeleteSoccerTrainingComponent', () => {
  let component: DialogDeleteSoccerTrainingComponent;
  let fixture: ComponentFixture<DialogDeleteSoccerTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteSoccerTrainingComponent ],
      imports: [ MaterialModules],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteSoccerTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
