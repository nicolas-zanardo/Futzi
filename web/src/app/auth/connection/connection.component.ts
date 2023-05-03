import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";
import {RegexUser} from "../../shared/enum/regex-user";


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class ConnectionComponent implements OnInit{

  public form!: FormGroup;
  public hide = true;
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
        Validators.required
      ]))
    })
  }

  submit(): void {
    if(this.form.valid) {
      this.authService.login(this.form.getRawValue()).subscribe({
        next: () => {
          this.router.navigateByUrl('/member').then()},
        error: (err) => this.errorSend = err?.error,
        complete: () => console.warn('INFO : CONNECTION USER ', new Date())
      });
    }
  }

  inscription(): void {
    this.router.navigate(['/registration']);
  }
}
