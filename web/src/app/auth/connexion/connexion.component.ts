import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit{

  public form!: FormGroup;
  public hide = true;
  constructor(
    private fb: FormBuilder,
    private router: Router) {
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
    console.log(this.form.getRawValue())
  }

  inscription() {
    this.router.navigate(['/inscription'])
  }
}
