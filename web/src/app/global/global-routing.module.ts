import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MatchComponent} from "./match/match.component";
import {EntrainementComponent} from "./entrainement/entrainement.component";
import {DataUserGuard} from "../shared/guards/user/data-user.guard";

const routes: Routes = [ // CLI imports router
  { path: "", canActivate: [DataUserGuard] , component : HomeComponent},
  { path: "match", canActivate: [DataUserGuard], component : MatchComponent},
  { path: "entrainement", canActivate: [DataUserGuard], component : EntrainementComponent},
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalRoutingModule { }
