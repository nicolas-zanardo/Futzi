import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPlayComponent } from './match-play.component';

describe('SoccerMatchComponent', () => {
  let component: MatchPlayComponent;
  let fixture: ComponentFixture<MatchPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchPlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
