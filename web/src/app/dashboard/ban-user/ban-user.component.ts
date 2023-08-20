import { Component } from '@angular/core';
import {AuthService} from "../../shared/services/auth/auth.service";
import {MessageService} from "../../shared/messages/MessageService";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BehaviorSubject, Subscription} from "rxjs";
import {TeamService} from "../../shared/services/team/team.service";
import {User} from "../../shared/interface/user.interface";


@Component({
  selector: 'app-ban-user',
  templateUrl: './ban-user.component.html',
  styleUrls: ['./ban-user.component.scss']
})
export class BanUserComponent {

  public subscription?: Subscription;
  public currentUser: User | null = this.authService.currentUser$.value;
  public contact: BehaviorSubject<User|null> = this.teamService.contact$;

  constructor(
    public _smackBar: MatSnackBar,
    public teamService: TeamService,
    private authService: AuthService) {
    this.teamService.getTeam().subscribe();
  }

  public logout(): void {
    this.subscription?.unsubscribe();
    this.authService.logout();
    this._smackBar.open(MessageService.logout, "✅", {
      duration: 10000
    })
  }

}
