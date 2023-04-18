import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConnexionComponent} from "./auth/connexion/connexion.component";
import {InscriptionComponent} from "./auth/inscription/inscription.component";



const routes: Routes = [
  { path: "",  loadChildren : () => import('./global/global-routing.module').then(m=>m.GlobalRoutingModule) },
  { path: "member",  loadChildren : () => import('./dashboard/dashboard-routing.module').then(m=>m.DashboardRoutingModule) },
  { path: "connexion", component: ConnexionComponent },
  { path: "inscription", component: InscriptionComponent }

]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
