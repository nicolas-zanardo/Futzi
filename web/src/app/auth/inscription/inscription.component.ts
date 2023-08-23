import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {RegexUser} from "../../shared/enum/regex-user";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatcherValidatorModule} from "../../shared/component/matcher/matcher-validator.module";


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit{

  public form: FormGroup = new FormGroup({});
  public hidePassword = true;
  public hideConfirmPassword = true;
  public errorSend: string | undefined;
  public isSend: boolean = false;

  constructor(
    private matchValidator: MatcherValidatorModule,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm(): void {
    this.form = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.pattern(RegexUser.email),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required,
        this.matchValidator.password('confirmPassword', true)
      ])),
      firstname: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.required,
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.required,
      ])),
      phone_number: new FormControl('', Validators.compose([
        Validators.pattern(RegexUser.phone),
        Validators.required,
      ])),
      passwordConfirm: new FormControl('', Validators.compose([
        Validators.required,
        this.matchValidator.password('password')
      ]))
    }, { } )
  }



  public submit(): void {
    if(this.form.valid) {
      this.isSend = true;
      this.authService.createUser(this.form.getRawValue()).subscribe( {
        next: () => {
          this._snackBar.open(this.authService.messageUser.value!, "✅", {
            duration: 5000
          });
          this.router.navigate(['/connexion']);
        },
        error: (err) => { this.errorSend = err?.error },
        complete: () => {
          console.warn('INFO : USER HAS BEEN CREATED ', new Date());
          this.isSend = false;
        }
      });
    }
  }

  public connection(): void {
    this.router.navigate(['/connexion']);
  }

}


