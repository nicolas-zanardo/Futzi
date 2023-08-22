import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidEmailAccountComponent } from './valid-email-account.component';

describe('ValidEmailAccountComponent', () => {
  let component: ValidEmailAccountComponent;
  let fixture: ComponentFixture<ValidEmailAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidEmailAccountComponent ]
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
