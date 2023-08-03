import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";
import {RegexUser} from "../../shared/enum/regex-user";
import {environment} from "../../../environments/environement.dev";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit{

  public form!: FormGroup;
  public hide = true;
  public errorSend: string | undefined;
  public googleLogo: string = `${environment.imagesPUBLIC}button/Google__G__Logo.png`;
  public googleAuth : string = `${environment.apiURL}/auth/google`;
  public isAuthAsk : boolean = false;

  constructor(
    public dialog: MatDialog,
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
        Validators.required
      ]))
    })
  }


  submit(): void {
    if(this.form.valid) {
      this.isAuthAsk = true;
      this.authService.login(this.form.getRawValue()).subscribe({
        next: () => {
          this.router.navigateByUrl('/member').then()},
        error: (err) => {
          this.errorSend = err?.error;
          this.isAuthAsk = false;
        },
        complete: () => {
          console.warn('INFO : CONNECTION USER ', new Date());
          this.isAuthAsk = false;
        }
      });
    }
  }

  inscription(): void {
    this.router.navigate(['/inscription']);
  }
}
