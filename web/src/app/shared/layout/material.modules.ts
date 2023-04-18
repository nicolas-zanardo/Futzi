import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";


const MODULE = [
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule
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
