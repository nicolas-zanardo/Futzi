import { Component } from '@angular/core';
import {AuthService} from "../../shared/services/auth/auth.service";
import {Observable} from "rxjs";
import {User} from "../../shared/interface/user.interface";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public user$: Observable<User | null> = this.authService.currentUser$.asObservable();
  constructor(private authService: AuthService) {
  }
}
