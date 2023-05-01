import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {DashboardComponent} from "./dashboard.component";
import {DataUserGuard} from "../shared/guards/user/data-user.guard";
import {RoleUserGuard} from "../shared/guards/auth/role-user.guard";

const routes: Routes = [ // CLI imports router
  { path: "", canActivate: [DataUserGuard, RoleUserGuard], component : DashboardComponent},
  { path: "profile", canActivate: [DataUserGuard, RoleUserGuard], component : ProfileComponent},

]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
