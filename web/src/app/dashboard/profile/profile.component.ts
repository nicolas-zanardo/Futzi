import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth/auth.service";
import {User} from "../../shared/interface/user.interface";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {RegexUser} from "../../shared/enum/regex-user";
import {ROLE} from "../../shared/enum/role";
import {UserService} from "../../shared/services/user/user.service";
import {environment} from "../../../environments/environement.dev";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  public userForm: FormGroup = new FormGroup({});
  public userCredentialForm: FormGroup = new FormGroup({});
  public user: User | null = this.authService.currentUser$.value;
  public isAdmin: boolean = false;
  public badgeColor?: string;
  public errorUserFormResponse: string | null = null;
  public errorUserCredentialFormResponse: string | null = null;
  public hideOldPassword = true;
  public hideNewPassword = true;
  public temper:string = `${environment.imagesPUBLIC}temper.gif`;
  public waitSubmitInfo: boolean = false;
  public waitSubmitPwd: boolean = false

  constructor(
    public _snackBar: MatSnackBar,
    private authService: AuthService,
    private userService: UserService,
    private fb : FormBuilder
  ) {}

  public ngOnInit() {
    this.initFormUser();
    this.initFormUserCredential();
    this.isAdmin = this.authService.findRoleUser(ROLE.ADMIN);
    this.badgeColor = this.setBackgroundColorBadge();
  }

  public initFormUser(): void {
    this.userForm = this.fb.group({
      id: new FormControl(this.user?.id),
      firstname: new FormControl(this.user?.firstname, Validators.compose([
        Validators.minLength(4),
        Validators.required
      ])),
      lastname: new FormControl(this.user?.lastname, Validators.compose([
        Validators.minLength(4),
        Validators.required
      ])),
      phone_number: new FormControl(this.user?.phone_number, Validators.compose([
        Validators.pattern(RegexUser.phone)
      ])),
      email: new FormControl(this.user?.email, Validators.compose([
        Validators.pattern(RegexUser.email),
        Validators.required
      ])),
      old_email: new FormControl(this.user?.email)
    })
  }

  public initFormUserCredential() :void {
    this.userCredentialForm = this.fb.group({
      id: new FormControl(this.user?.id),
      old_password: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]))
    })
  }

  public setBackgroundColorBadge(): string {
    if(this.isAdmin) {
      return "background-color: green";
    } else {
      return "background-color: red";
    }
  }

  /**
   * Submit FORM user information
   */
  public submitUserFormGroup(): void {
    if(this.userForm.valid) {
      this.waitSubmitInfo = true;
      window.document.getElementById('btnInfo')?.setAttribute("disabled", "disabled");
      this.userService.editUserInformation(this.userForm.getRawValue()).subscribe( {
        next: (response: any) => {
          if(response) {
            let newUser: User = {
              id: this.user!.id,
              firstname: this.userForm.value.firstname,
              lastname: this.userForm.value.lastname,
              phone_number: this.userForm.value.phone_number,
              email: this.userForm.value.email,
              old_email: this.user?.email,
              ROLE: this.user!.ROLE,
              is_valid_email : this.user!.is_valid_email,
              id_category: this.user?.id_category
            };
            this.authService.currentUser$.next(newUser);
            this._snackBar.open("Les informations de votre compte ont bien été modifié", "✅", {
              duration: 5000
            })
          }
        },
        error: (err) => {
          this._snackBar.open("Les informations de votre compte n'ont pas été modifié", "❌", {
            duration: 5000
          })
          this.errorUserFormResponse = err?.error;
          this.waitSubmitInfo = false;
          window.document.getElementById('btnInfo')?.removeAttribute("disabled");
        },
        complete: () => {
          window.document.getElementById('btnInfo')?.removeAttribute("disabled");
          this.waitSubmitInfo = false;
          console.warn('INFO : USER INFO UPDATE', new Date());
          this.user = this.authService.currentUser$.value;
        }
      });
    }
  }

  /**
   * Submit FORM user credential
   */
  public submitUserCredentialFormGroup(formDirective: FormGroupDirective):void {
    if(this.userCredentialForm.valid) {
      this.waitSubmitPwd = true;
      window.document.getElementById('btnPwd')?.setAttribute("disabled", "disabled");
      this.userService.editUserCredential(this.userCredentialForm.getRawValue()).subscribe({
        next: (message: any) => {
          this.errorUserCredentialFormResponse = message;
          formDirective.resetForm();
          this._snackBar.open("Le mot de passe a bien été modifié", "✅", {
            duration: 5000
          });
        },
        error: (err) => {
          this.errorUserCredentialFormResponse = err?.error
          this._snackBar.open("Le mot de passe n'a pas été modifié", "❌", {
            duration: 5000
          });
          window.document.getElementById('btnPwd')?.removeAttribute("disabled");
          this.waitSubmitPwd = false;
        },
        complete: () => {
          window.document.getElementById('btnPwd')?.removeAttribute("disabled");
          this.waitSubmitPwd = false;
          setTimeout(()=> {
            this.errorUserCredentialFormResponse = "";
          },5000)
        }
      })

    }
  }

}
