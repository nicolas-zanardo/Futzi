import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMemberComponent } from './delete-member.component';
import {MaterialModules} from "../../../shared/layout/material.modules";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

describe('DeleteMemberComponent', () => {
  let component: DeleteMemberComponent;
  let fixture: ComponentFixture<DeleteMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModules],
      declarations: [ DeleteMemberComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
