import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth/auth.service";
import {ROLE} from "../shared/enum/role";
import {User} from "../shared/interface/user.interface";
import {UserService} from "../shared/services/user/user.service";
import {SoccerTraining} from "../shared/interface/soccer-training.interface";
import {SoccerTrainingService} from "../shared/services/soccer-training/soccer-training.service";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  public allTraining: SoccerTraining[] = this.trainingService.allSoccerTraining$.value;
  public currentUser: User | null = this.authService.currentUser$.value;
  public countTrainingByCategory : {category: string, number_training: number}[] = [];
  public seasonDate?: string;
  public isAdmin: boolean = this.authService.findRoleUser(ROLE.ADMIN);
  public allUsers: User[] | [] = this.userService.allUsers$.value;
  public listUsersRole: {ROLE: string[], isValidEmail: boolean }[]  = [];
  public usersROLE_USER: any[] = [];
  public usersROLE_ADMIN: any[] = [];
  public usersROLE_BAN: any[] = [];
  public userInValidAccount: any [] = [];


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private trainingService: SoccerTrainingService
  ) {
    this.trainingService.countTrainingByCategory().subscribe((data: {category: string, number_training: number}[])=> {
      this.countTrainingByCategory = data;
    })
  }

  ngOnInit(): void {
    this.seasonDate = this.seasonYear();
    this.checkAllUsersIsProvide();
    this.createListUsersRole();
    this.createGroupROLE();
    this.trainingService.getAllSoccerTraining().subscribe((training: SoccerTraining[]) =>{
      this.allTraining = training;
    })


  }

  private checkAllUsersIsProvide(): void {
    if(!this.allUsers.length) {
      this.userService.getAllUsers().subscribe((users: User[]) => {
        this.allUsers = users;
        this.createListUsersRole();
        this.createGroupROLE();
      });

    }
  }

  private createGroupROLE(): void {
    if(this.isAdmin) {
      this.getAllUserROLE_USER();
      this.getAllUserROLE_ADMIN();
      this.getAllUserROLE_BAN();
      this.getAllUserInValidAccount()
    }
  }

  private createListUsersRole(): void {
    this.allUsers.forEach((user: User) => {
      if(JSON.parse(user.ROLE!).length >= 1) {
        this.listUsersRole.push({
          ROLE: JSON.parse(user.ROLE!),
          isValidEmail: user.is_valid_email!
        })
      }
    })
  }

  private getAllUserInValidAccount(): void {
    this.userInValidAccount = [];
    this.listUsersRole.forEach((user: {ROLE: string[], isValidEmail: boolean }) => {
      if(!user.ROLE.includes(ROLE.BAN) && !user.isValidEmail) {
        this.userInValidAccount.push(user);
      }
    })
  }

  private getAllUserROLE_USER(): void {
    this.usersROLE_USER = [];
    this.listUsersRole.forEach((user: {ROLE: string[], isValidEmail: boolean }) => {
      if(user.ROLE.length == 1 && user.isValidEmail) {
        this.usersROLE_USER.push(user);
      }
    })
  }

  private getAllUserROLE_ADMIN(): void {
    this.usersROLE_ADMIN = [];
    this.listUsersRole.forEach((user: {ROLE: string[], isValidEmail: boolean }) => {
      if(user.ROLE.includes(ROLE.ADMIN) && user.isValidEmail) {
        this.usersROLE_ADMIN.push(user);
      }
    })
  }

  private getAllUserROLE_BAN(): void {
    this.usersROLE_BAN = [];
    this.listUsersRole.forEach((user: {ROLE: string[], isValidEmail: boolean }) => {
      if(user.ROLE.includes(ROLE.BAN) && user.isValidEmail) {
        this.usersROLE_BAN.push(user);
      }
    })
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
