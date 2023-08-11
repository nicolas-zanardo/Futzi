import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatchComponent } from './match/match.component';
import { EntrainementComponent } from './entrainement/entrainement.component';
import { SlideshowComponent } from './home/slideshow/slideshow.component';
import {GlobalRoutingModule} from "./global-routing.module";

@NgModule({
  declarations: [
    HomeComponent,
    MatchComponent,
    EntrainementComponent,
    SlideshowComponent
  ],
  imports: [
        CommonModule,
        GlobalRoutingModule,
        NgOptimizedImage
  ]
})
export class GlobalModule { }
