import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router, RouterModule} from "@angular/router";
import {UserService} from "../../shared/services/user/user.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {MatcherValidatorModule} from "../../shared/component/matcher/matcher-validator.module";
import {environment} from "../../../environments/environement.dev";
import {NavigateModule} from "../../shared/component/navigate/navigate.module";
import {User} from "../../shared/interface/user.interface";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-valid-reset-password',
  templateUrl: './valid-reset-password.component.html',
  styleUrls: ['./valid-reset-password.component.scss']
})
export class ValidResetPasswordComponent implements OnInit {

  public isValidToken?: boolean;
  public form!: FormGroup;
  public hidePassword: boolean = true;
  public hideConfirmPassword: boolean = true;
  public clock: string = `${environment.imagesPUBLIC}tools/2-minutes.gif`;
  public user?: User;
  public logo: string = `${environment.imagesPUBLIC}LOGO_OSNY.png`;

  private token: string | null | undefined;

  constructor(
    public _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private nav: NavigateModule,
    private fb: FormBuilder,
    private matchValidator: MatcherValidatorModule,
    private userService : UserService,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((param: ParamMap) => {
      this.token = param.get('token');
      if(!this.token) {
        this.nav.backToLogin();
        this.isValidToken = false;
      }
    })
    this.userService.getUserByTokenRestPassword(this.token).subscribe((user) => {
      this.isValidToken = false;
      if(user && user.token_time_validity! > Date.now()) {
        this.user = user;
        this.createForm();
        this.isValidToken = true;
      }
      if(!this.isValidToken) this.nav.backToLogin();
      this.isValidToken = undefined;
    })
  }

  public createForm(): void {
    this.form = this.fb.group({
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        this.matchValidator.password('confirmPassword', true)
      ])),
      passwordConfirm: new FormControl('', Validators.compose([
        Validators.required,
        this.matchValidator.password('password')
      ]))
    })
  }

  public submit(): void {
    if(this.form.valid && this.user) {
      this.isValidToken = undefined;
      this.user.password = this.form.get('password')?.value;
      this.userService.resetPassword(this.user).subscribe((resp) => {
        this.isValidToken = true;
        this._snackBar.open("Le mot de passe a bien été modifié", "✅",{
          duration: 10000
        })
        this.router.navigate(['/connexion']).then();
      });

    }

  }

}
