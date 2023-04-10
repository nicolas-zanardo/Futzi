import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {MatchComponent} from "./match/match.component";
import {EntrainementComponent} from "./entrainement/entrainement.component";

const routes: Routes = [ // CLI imports router
  { path: "", component : HomeComponent},
  { path: "match", component : MatchComponent},
  { path: "entrainement", component : EntrainementComponent},
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalRoutingModule { }
