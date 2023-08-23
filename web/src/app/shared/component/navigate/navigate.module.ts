import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class NavigateModule {

  constructor(
    private router: Router,
  ) {
  }

  public backToLogin() {
    setTimeout(()=> {
      this.router.navigate(['/connexion']).then(r => {});
    }, 1000*60*2)
  }
}
