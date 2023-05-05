import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {RegexUser} from "../../shared/enum/regex-user";


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

  constructor(
    private fb: FormBuilder,
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
        this.matchValidator('confirmPassword', true)
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
        this.matchValidator('password')
      ]))
    }, { } )
  }

  public matchValidator(matchTo: string, reverse?: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.parent && reverse) {
        const c = (control.parent?.controls as any)[matchTo] as AbstractControl;
        if (c) {
          c.updateValueAndValidity();
        }
        return null;
      }
      return !!control.parent && !!control.parent.value &&
      control.value === (control.parent?.controls as any)[matchTo].value?
        null : { matching: true };
    };
  }

  public submit(): void {
    if(this.form.valid) {
      this.authService.createUser(this.form.getRawValue()).subscribe( {
        next: () => this.router.navigate(['/connection']),
        error: (err) => { this.errorSend = err?.error },
        complete: () => console.warn('INFO : USER HAS BEEN CREATED ', new Date())
      });
    }
  }

  public connection(): void {
    this.router.navigate(['/connection']);
  }

}


