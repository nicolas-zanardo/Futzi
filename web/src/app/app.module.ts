import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModules} from "./shared/layout/material.modules";
import {GlobalModule} from "./global/global.module";
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './shared/component/navbar/navbar.component';
import {DashboardModule} from "./dashboard/dashboard.module";
import {AppRoutingModule} from "./app-routing.module";
import {ConnexionComponent} from './auth/connexion/connexion.component';
import {ReactiveFormsModule} from "@angular/forms";
import { InscriptionComponent } from './auth/inscription/inscription.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConnexionComponent,
    InscriptionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModules,
    RouterModule,
    AppRoutingModule,
    GlobalModule,
    DashboardModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
