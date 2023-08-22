import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule, Meta} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";

import {AppRoutingModule} from "./app-routing.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {GlobalModule} from "./global/global.module";

import {MaterialModules} from "./shared/layout/material.modules";

import {NavbarComponent} from './shared/component/navbar/navbar.component';
import {AppComponent} from './app.component';
import {InscriptionComponent} from './auth/inscription/inscription.component';

import {ConnectionComponent} from "./auth/connection/connection.component";
import {AuthInterceptor} from "./shared/interceptor/auth.interceptor";
import { DateComponent } from './shared/component/date/date.component';
import { SocialComponent } from './auth/social/social.component';
import { MobileNavbarComponent } from './shared/component/mobile-navbar/mobile-navbar.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { LogoutDialogComponent } from './shared/component/navbar/logout-dialog/logout-dialog.component';
import { NotFoundComponent } from './shared/component/error/not-found/not-found.component';
import { ValidEmailAccountComponent } from './auth/valid-email-account/valid-email-account.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConnectionComponent,
    InscriptionComponent,
    DateComponent,
    SocialComponent,
    MobileNavbarComponent,
    FooterComponent,
    LogoutDialogComponent,
    NotFoundComponent,
    ValidEmailAccountComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModules,
    RouterModule,
    AppRoutingModule,
    GlobalModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage,
    DashboardModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    [Meta],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
