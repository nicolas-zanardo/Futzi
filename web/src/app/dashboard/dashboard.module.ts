import { NgModule } from '@angular/core';
import {MaterialModules} from "../shared/layout/material.modules";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from "./dashboard-routing.module";

import {ProfileComponent} from './profile/profile.component';
import {DashboardComponent} from './dashboard.component';
import {BanUserComponent} from './ban-user/ban-user.component';
import {MemberComponent} from './member/member.component';
import {RoleUserPipe} from "../shared/pipe/role-user.pipe";


@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    BanUserComponent,
    MemberComponent,
    RoleUserPipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    RoleUserPipe
  ]
})
export class DashboardModule { }
