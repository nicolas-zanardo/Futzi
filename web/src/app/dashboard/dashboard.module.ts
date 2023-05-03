import { NgModule } from '@angular/core';
import {MaterialModules} from "../shared/layout/material.modules";
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from "./dashboard-routing.module";

import {ProfileComponent} from './profile/profile.component';
import {DashboardComponent} from './dashboard.component';
import {BanUserComponent} from './ban-user/ban-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    BanUserComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
