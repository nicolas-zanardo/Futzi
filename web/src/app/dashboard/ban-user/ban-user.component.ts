import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-ban-user',
  templateUrl: './ban-user.component.html',
  styleUrls: ['./ban-user.component.scss']
})
export class BanUserComponent {
  constructor(
    private router: Router,
    private authService: AuthService) {
  }
  public logout(): void {
    this.authService.logout();
  }
}
