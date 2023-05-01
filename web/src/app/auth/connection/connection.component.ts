import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth/auth.service";


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

  public createForm() {
    this.form = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.pattern('^([a-zA-Z0-9._-]+)@([a-zA-Z0-9._-]+)\\.([a-zA-Z]{2,6})$'),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  submit() {
    if(this.form.valid) {
      this.authService.login(this.form.getRawValue()).subscribe({
        next: () => {
          this.router.navigateByUrl('/member').then()},
        error: (err) => this.errorSend = err?.error,
        complete: () => console.warn('INFO : CONNECTION USER ', new Date())
      });
    }
  }

  inscription() {
    this.router.navigate(['/registration']);
  }
}
