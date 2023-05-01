import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth/auth.service";
import {Observable, switchMap, tap} from "rxjs";
import {User} from "../shared/interface/user.interface";
import {ROLE} from "../shared/enum/role";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  public firstName?: string = this.authService.currentUser$.value?.firstname;
  public lastName?: string = this.authService.currentUser$.value?.lastname;
  public email?: string = this.authService.currentUser$.value?.email;
  public seasonDate?: string;
  public isAdmin: boolean = this.authService.findRoleUser(ROLE.ADMIN);

  constructor(private authService : AuthService) {}


  ngOnInit(): void {
    this.seasonDate = this.seasonYear();
  }

  private seasonYear(): string {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let season: string;
    if(month >= 9) {
      season = year+'/'+(year+1);
    } else {
      season = (year-1)+'/'+year;
    }
    return season;
  }
}
