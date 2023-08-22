import {Component, DoCheck, OnInit,} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../environments/environement.dev";
import {UserService} from "../../shared/services/user/user.service";
import {AuthService} from "../../shared/services/auth/auth.service";
import {SocialCredentialInterface} from "../../shared/interface/social-credential.interface";
import {MessageService} from "../../shared/messages/MessageService";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit  {

  public isError: boolean = false;
  private token: string | null | undefined;
  public googleLogo: string = `${environment.imagesPUBLIC}button/Google__G__Logo.png`;
  public logo: string = `${environment.imagesPUBLIC}LOGO_OSNY.png`;
  private messageUser$ = this.authService.messageUser;
  public messageUser: string | null = null;

  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private userService : UserService,
    private authService : AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.token = param.get('token');
    })
    this.userService.getUserByTokenURL(this.token).subscribe(value => {
      this.isValidSocialCredential(value);
    });
  }

  private isValidSocialCredential(userToken: SocialCredentialInterface | null | undefined) {
    this.isError = true;
    if(userToken) this.checkSocialCredential(userToken, this.token);
  }

  private checkSocialCredential(userToken: SocialCredentialInterface, token: string | null | undefined) {
    if(this.isTrueCredential(userToken, token)) {
      this.isError = false;
      this.authService.socialLogin(userToken).subscribe({
        next: () => {
          this._snackBar.open(MessageService.loginSuccessful, "✅", {
            duration: 5000
          });
          this.router.navigateByUrl('/member').then()},
        complete: () => console.warn('INFO : SOCIAL CONNECTION USER ', new Date())
      })
    } else {
      this.isError = true;
    }
    setInterval(()=> {
      this.isError = !this.isTrueCredential(userToken, token);
      this.messageUser = this.messageUser$.value;
    },10000)
  }

  private isTrueCredential(userToken : SocialCredentialInterface, token: string | null | undefined) {
    const isValidDate = userToken!.token_time_validity! >= Date.now();
    const isValidToken = userToken!.tokenURL === token;
    return isValidDate && isValidToken;
  }


}
