import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {environment} from "../../../../environments/environement.dev";
import {User} from "../../interface/user.interface";
import {Router} from "@angular/router";
import {JwtToken} from "../../model/jwt-token.model";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Input() public isLogged!: boolean | null ;
  public logo: string = `${environment.images}LOGO_OSNY.png`;
  public jwtToken?: JwtToken;
  public subscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService) {
    this.authService.initToken();
  }

  ngOnInit(): void {
    this.authService.jwtToken.subscribe((jwtToken: JwtToken) => {
      this.jwtToken = jwtToken;
    })
  }

  public isDisplayBtn(url: string) {
    return this.router.url === url;
  }

  public logout() {
    this.subscription?.unsubscribe();
    this.authService.logout();
  }
}
