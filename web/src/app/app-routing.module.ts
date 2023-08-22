import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {InscriptionComponent} from "./auth/inscription/inscription.component";
import {ConnectionComponent} from "./auth/connection/connection.component";
import {DataUserGuard} from "./shared/guards/user/data-user.guard";
import {SocialComponent} from "./auth/social/social.component";
import {NotFoundComponent} from "./shared/component/error/not-found/not-found.component";
import {ValidEmailAccountComponent} from "./auth/valid-email-account/valid-email-account.component";



const routes: Routes = [
  { path: "",  loadChildren : () => import('./global/global-routing.module').then(m=>m.GlobalRoutingModule) },
  { path: "auth/:token", component: SocialComponent},
  { path: "member",  loadChildren : () => import('./dashboard/dashboard-routing.module').then(m=>m.DashboardRoutingModule) },
  { path: "connexion", canActivate: [DataUserGuard], component: ConnectionComponent },
  { path: "inscription", canActivate: [DataUserGuard], component: InscriptionComponent },
  { path: "valid-email-account/:token", canActivate: [DataUserGuard], component: ValidEmailAccountComponent},
  { path: "**", canActivate: [DataUserGuard], component: NotFoundComponent}

]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
