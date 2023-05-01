import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {InscriptionComponent} from "./auth/inscription/inscription.component";
import {ConnectionComponent} from "./auth/connection/connection.component";
import {DataUserGuard} from "./shared/guards/user/data-user.guard";



const routes: Routes = [
  { path: "",  loadChildren : () => import('./global/global-routing.module').then(m=>m.GlobalRoutingModule) },
  { path: "member",  loadChildren : () => import('./dashboard/dashboard-routing.module').then(m=>m.DashboardRoutingModule) },
  { path: "connection", canActivate: [DataUserGuard], component: ConnectionComponent },
  { path: "registration", canActivate: [DataUserGuard], component: InscriptionComponent }

]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
