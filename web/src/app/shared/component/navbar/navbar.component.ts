import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environement.dev";
import {Router} from "@angular/router";
import {JwtToken} from "../../interface/jwt-token.interface";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {ROLE} from "../../enum/role";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Input() public isLogged!: boolean | null ;
  public logo: string = `${environment.imagesPUBLIC}LOGO_OSNY.png`;
  public jwtToken?: JwtToken;
  public subscription?: Subscription;
  public isBanUser: boolean = true;
  public btnUserClass: string;

  constructor(
    private router: Router,
    private authService: AuthService) {
    this.authService.initToken();
    this.btnUserClass = this.setBtnUserClass();
  }

  ngOnInit(): void {
    this.authService.jwtToken.subscribe((jwtToken: JwtToken) => {
      this.jwtToken = jwtToken;
    })
  }

  public setBtnUserClass(): string {
    this.isBanUser = this.authService.findRoleUser(ROLE.BAN);
    if(this.isBanUser) {
      return "btn-ban";
    } else {
      return "btn-user";
    }
  }

  public isDisplayBtn(url: string) {
    return this.router.url === url;
  }

  public logout() {
    this.subscription?.unsubscribe();
    this.authService.logout();
  }

    protected readonly environment = environment;
}
