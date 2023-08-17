import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "./shared/services/auth/auth.service";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isLogged$ : Observable<boolean> = this.authService.isLogged$.asObservable();

  constructor(private authService: AuthService) {
    registerLocaleData(localeFr, 'fr');
  }
}
