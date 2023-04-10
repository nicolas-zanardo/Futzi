import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';


const MODULE = [
  MatIconModule,
  MatButtonModule,
  MatCardModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...MODULE
  ],
  exports: [
    MODULE
  ],
  declarations: [

  ]
})

export class MaterialModules {}
