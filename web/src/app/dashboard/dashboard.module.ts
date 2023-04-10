import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { DashboardComponent } from './dashboard.component';
import {MaterialModules} from "../share/layout/material.modules";




@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModules
  ]
})
export class DashboardModule { }
