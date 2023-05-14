import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteMatchPlayComponent } from './dialog-delete-match-play.component';

describe('DialogDeleteMatchPlayComponent', () => {
  let component: DialogDeleteMatchPlayComponent;
  let fixture: ComponentFixture<DialogDeleteMatchPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteMatchPlayComponent ]
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
