import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideshowComponent } from './slideshow.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SlideshowComponent', () => {
  let component: SlideshowComponent;
  let fixture: ComponentFixture<SlideshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ SlideshowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a slide', () => {
    const fixture = TestBed.createComponent(SlideshowComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const mySlides = fixture.nativeElement.querySelectorAll('.mySlides');
    expect(mySlides.length).toEqual(component.imgSlide.length)
  });

});
