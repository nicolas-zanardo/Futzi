import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [ // CLI imports router
  { path: "dashboard", component : DashboardComponent},
  { path: "profile", component : ProfileComponent},

]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
