import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../shared/services/user/user.service";
import {User} from "../../shared/interface/user.interface";
import {ROLE, SetROLE} from "../../shared/enum/role";
import {Team} from "../../shared/interface/team.interface";
import {TeamService} from "../../shared/services/team/team.service";
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {animate, state, style, transition, trigger} from '@angular/animations';
import {RoleUserPipe} from "../../shared/pipe/role-user.pipe";
import {AuthService} from "../../shared/services/auth/auth.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [RoleUserPipe]
})
export class MemberComponent implements OnInit, AfterViewInit  {

  // SERVICE
  public currentUser: User | null = this.authService.currentUser$.value;
  public allUsers: User[] | [] = this.userService.allUsers$.value;
  public team: BehaviorSubject<Team | null> = this.teamService.currentTeam$;
  public listUsersContact: {value: number, user: User ,name: string}[] = [];
  public contactByIdTeam: BehaviorSubject<number> = this.teamService.contactById$;
  public selected?: number = this.contactByIdTeam.value;
  // FORM
  public formContact: FormGroup = new FormGroup({});
  public formChangeStatus: FormGroup = new FormGroup({});
  //DATA
  public objStatus : {ROLE: SetROLE, info_status: string}[] = [
    {ROLE: SetROLE.MEMBRE, info_status: "MEMBRE"},
    {ROLE: SetROLE.BANNI, info_status: "BANNI"},
    {ROLE: SetROLE.DEMANDE, info_status: "DEMANDE"},
    {ROLE: SetROLE.SUPPRIMER, info_status: "SUPPRIMER"},
  ]
  public columnsToDisplay : {column: string, name: string}[] = [
    {column:'firstname', name: "Prénom"},
    {column:'lastname', name: "Nom"}
  ];
  // DATATABLE
  public columnsToDisplayWithExpand = ['firstname', 'lastname', 'expand'];
  public expandedElement: User[] | null = null;
  public dataSource: MatTableDataSource<User>;
  // DATATABLE - PAGINATOR
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private teamService: TeamService,
    private fb: FormBuilder,
  ) {
    this.dataSource = new MatTableDataSource(this.allUsers);
  }

  ngOnInit(): void {
    this.createListContact();
    // FORM
    this.createFormContact();
    this.createFormStatusUser();
  }
  ngAfterViewInit() {
    this.dataSource!.paginator = this.paginator!;
    this.dataSource!.sort = this.sort!;
    this.createListContact()
  }

  //#################### STYLE CSS #############################
  public setBackgroundColorInfoUserStatus(status:string): string {
    let styleBckColor = "background-color: ";
    if(status === "DEMANDE") {styleBckColor+="#04a6dd"};
    if(status === "BANNI") {styleBckColor+="red"};
    if(status === "MEMBRE") {styleBckColor+="#06387e"};
    return styleBckColor;
  }

  //###################### FILTER ##############################
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  public filterUserList(): void {
    if(this.formContact.get('search')?.value == "") {
      this.createListContact();
    }
    this.listUsersContact = this.listUsersContact.filter((elt: {value: number, user: User ,name: string}) =>
      elt.user.firstname?.includes(this.formContact.get('search')!.value) ||
      elt.user.lastname?.includes(this.formContact.get('search')!.value) ||
      elt.user.email?.includes(this.formContact.get('search')!.value) ||
      elt.user.phone_number?.includes(this.formContact.get('search')!.value)
    )
  }

  //#################### [formContact] #############################
  public createFormContact(): void {
    this.formContact = this.fb.group({
      id: new FormControl("", Validators.compose([Validators.required])),
      contact: new FormControl(this.selected, Validators.compose([
        Validators.required
      ])),
      search: new FormControl('')
    })
  }
  public submitFormUserContact(): void {
    this.formContact.get("id")?.setValue(this.teamService.currentTeam$.value?.id)
    if(this.formContact.valid) {
      this.teamService.updateTeamContact(this.formContact.getRawValue()).subscribe(() => {
        this.listUsersContact = [];
        this.createListContact()
      })
    }
  }
  private createListContact(): void {
    this.teamService.getTeam().subscribe((team: Team) => {
      if(team) {
        this.team.next(team);
        this.contactByIdTeam.next(this.team.value!.id_user);
        this.selected = this.contactByIdTeam.value;

        this.userService.getAllUsers().subscribe((users: User[] | []) => {

          this.allUsers = users;
          this.dataSource = new MatTableDataSource(this.allUsers);
          this.dataSource!.paginator = this.paginator!;
          this.dataSource!.sort = this.sort!;
          this.contactByIdTeam.next(this.team.value!.id_user);
          this.selected = this.contactByIdTeam.value;

          this.listUsersContact = [];
          this.allUsers?.forEach((user: User): void => {
            if(user.ROLE?.includes(ROLE.ADMIN) && user.is_valid_email) {
              this.listUsersContact.push({value: user.id!, user: user, name: `➧ ${user.firstname} ${user.lastname}
        ☎ tel: ${user.phone_number}
        ✉ email: ${user.email} ${(user.id === this.selected)? ' ✓ ':''}`})
            }
          })
        })
      }
    })

  }

  //#################### [FormStatusUser] #############################
  public createFormStatusUser(): void {
    this.formChangeStatus = this.fb.group({
      id_user_update: new FormControl(null,Validators.compose([
        Validators.required
      ])),
      id_current_user: new FormControl(null,Validators.compose([
        Validators.required
      ])),
      ROLE: new FormControl(null,Validators.compose([
        Validators.required
      ])),
    })
  }
  public selectedStatus(o1: any, o2: any): boolean {
    return o1 == o2;
  }

  public submitChangeStatus(id_user_update: number, id_current_user?: number, ROLE?: string) {
    this.formChangeStatus.setValue({
      id_user_update: id_user_update,
      id_current_user: id_current_user,
      ROLE: ROLE,
    })
    if(this.formChangeStatus.valid && (id_user_update != id_current_user)) {
      let oldUser: User | undefined = this.allUsers.find((user:User) => {return user.id == id_user_update});
      if(oldUser) {
        if(ROLE != SetROLE.SUPPRIMER) {
          this.updateRoleUser(oldUser);
        } else {
          this.deleteUser();
        }
      } else {
        console.log("Not found user to send API request")
      }

    }
  }

  private updateRoleUser(oldUser?: User): void {
    this.userService.editUserROLE(this.formChangeStatus.getRawValue()).subscribe({
      next: () => {
        this.userService.allUsers$.subscribe({
          next: (users: User[] | []): void => {
            if(users.length) {
              let user = users.find(user => user.id === this.formChangeStatus.get('id_user_update')?.value);
              user!.info_status = this.authService.setInfoStatueByRole(oldUser!.ROLE!)
              user!.ROLE = this.formChangeStatus.get('ROLE')?.value;
            }
          }
        });
        oldUser!.info_status = this.authService.setInfoStatueByRole(oldUser!.ROLE!)
      },
      error: (err) => {
        console.log("ERROR on request API ", err)
        oldUser!.ROLE = this.authService.setRoleByInfoStatus(oldUser!.info_status!)
      }
    })
  }

  private deleteUser(): void {
    this.userService.deleteUser(this.formChangeStatus.get('id_user_update')!.value, this.formChangeStatus.get('id_current_user')!.value).subscribe({
      next: () => {
        this.userService.allUsers$.subscribe({
          next: (users: User[] | []): void => {
            this.dataSource.data = this.dataSource.data.filter((user: User) => user.id != this.formChangeStatus.get('id_user_update')?.value);
          }
        });
      },
      error: (err) => {
        console.log("ERROR on request API ", err)
      }
    })
  }
}
