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
import { SoccerTrainingComponent } from './soccer-training/soccer-training.component';
import { CategoryComponent } from './category/category.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FootballPitchComponent } from './football-pitch/football-pitch.component';
import {
  DialogDeleteSoccerTrainingComponent
} from "./soccer-training/dialog-delete-soccer-training/dialog-delete-soccer-training.component";
import {MatchPlayComponent} from "./match-play/match-play.component";


@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    BanUserComponent,
    MemberComponent,
    RoleUserPipe,
    SoccerTrainingComponent,
    CategoryComponent,
    FootballPitchComponent,
    DialogDeleteSoccerTrainingComponent,
    MatchPlayComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    RoleUserPipe
  ]
})
export class DashboardModule { }
