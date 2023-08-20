import { Component } from '@angular/core';
import {environment} from "../../../../../environments/environement.dev";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  public imgError404: string = `${environment.imagesPUBLIC}erreur-404.jpg`;

  constructor() {
    console.log(this.imgError404)
  }
}
