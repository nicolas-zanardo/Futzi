import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from "./profile/profile.component";
import {DashboardComponent} from "./dashboard.component";
import {DataUserGuard} from "../shared/guards/user/data-user.guard";
import {RoleUserGuard} from "../shared/guards/auth/role-user.guard";
import {BanUserComponent} from "./ban-user/ban-user.component";
import {RoleBanGuard} from "../shared/guards/auth/role-ban.guard";
import {MemberComponent} from "./member/member.component";

const routes: Routes = [ // CLI imports router
  { path: "", canActivate: [DataUserGuard, RoleUserGuard], component: DashboardComponent},
  { path: "profile", canActivate: [DataUserGuard, RoleUserGuard], component: ProfileComponent},
  { path: "manage-user", canActivate: [DataUserGuard, RoleUserGuard], component: MemberComponent},
  { path: "ban", canActivate: [DataUserGuard, RoleBanGuard], component: BanUserComponent}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
