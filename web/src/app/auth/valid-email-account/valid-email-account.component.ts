import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../shared/services/user/user.service";
import {User} from "../../shared/interface/user.interface";
import {environment} from "../../../environments/environement.dev";
import {NavigateModule} from "../../shared/component/navigate/navigate.module";

@Component({
  selector: 'app-valid-email-account',
  templateUrl: './valid-email-account.component.html',
  styleUrls: ['./valid-email-account.component.scss']
})
export class ValidEmailAccountComponent implements OnInit {

  public errorMessage: string|null = null;
  public validMessage: string|null = null;
  private token: string | null | undefined;
  public userRequest = this.userService.userRequest$;
  public clock: string = `${environment.imagesPUBLIC}tools/2-minutes.gif`;

  constructor(
    private route: ActivatedRoute,
    private nav: NavigateModule,
    private userService : UserService,
  ) {}

  ngOnInit() {
      this.route.paramMap.subscribe((param) => {
          this.token = param.get('token');
      })
      this.userService.getUserByTokenValidEmail(this.token).subscribe( value => {
          if(value) return this.validEmail(value);
          this.errorMessage = "Le token n'est pas valide, veuillez vous reconnecter";
          this.nav.backToLogin();
      })
  }

  private validEmail(user: User) {
    if(user.token_time_validity && user.token_time_validity > Date.now()) {
        this.validMessage = "Le token est valide";
        this.userService.validTokenValidEmail(user).subscribe();
    } else {
        this.errorMessage = "Le token n'est pas valide, veuillez vous reconnecter";
        this.nav.backToLogin();
    }
  }


}
