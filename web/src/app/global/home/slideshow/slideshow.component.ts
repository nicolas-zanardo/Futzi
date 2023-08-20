import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environement.dev";

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent implements OnInit, AfterViewInit, OnDestroy {

  private slideIndex: number = 1;
  private automateSlide: any;


  public imgSlide: { css: string }[] = [
    {css: 'background-image: url('+environment.imagesPUBLIC+'slideshow/slide-1.jpg) !important; background-position: top'},
    {css: 'background-image: url('+environment.imagesPUBLIC+'slideshow/slide-2.jpg) !important; background-position: top'},
    {css: 'background-image: url('+environment.imagesPUBLIC+'slideshow/slide-3.jpg) !important; background-position: top'},
  ]

  public ngOnInit(): void {

  }

  public ngAfterViewInit(): void {
    this.showSlides(this.slideIndex);
    this.startSlide();
  }

  private startSlide() {
    this.automateSlide = setInterval(()=> {
      this.slideIndex++;
      if(this.slideIndex > this.imgSlide.length) {
        this.slideIndex = 1;
      }
      this.showSlides(this.slideIndex);
    },5000)
  }

  private stopSlide(): void {
    clearInterval(this.automateSlide);
  }

  public plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
    this.stopSlide();
    this.startSlide();
  }

  public currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
    this.stopSlide();
    this.startSlide();
  };

  public showSlides(n: number)  {
    let i;
    let slides: NodeListOf<HTMLElement> = document.querySelectorAll(".mySlides")!;
    let dots: HTMLCollection = document.getElementsByClassName("dot")!;

    if (n > slides.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex-1].style.display = "block";
    dots[this.slideIndex-1].className += " active";
  }

  public ngOnDestroy(): void {
    this.stopSlide();
  }

}
