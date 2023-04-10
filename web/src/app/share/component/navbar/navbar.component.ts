import { Component } from '@angular/core';
import {environment} from "../../../../environments/environement.dev";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public logo: string = `${environment.images}LOGO_OSNY.png`;
}
