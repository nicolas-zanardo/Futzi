import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../../environments/environement.dev";
import {User} from "../../interface/user.interface"
import {handleError} from "../handel-error";
import {ROLE} from "../../enum/role";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public allUsers$: BehaviorSubject<User[] | []> = new BehaviorSubject<User[] | []>([]);

  constructor(
    private http: HttpClient,
  ) {}

  public editUserInformation(user: User): Observable<User | null> {
    return this.http.put<User>(`${environment.apiURL}/user/edit-info`, user).pipe();
  }

  public editUserROLE(user: User): Observable<User> {
    return this.http.put<User>(`${environment.apiURL}/user/edit-role`, user).pipe();
  }


  public editUserCredential(user: User): Observable<User | null> {
    return this.http.put<User>(`${environment.apiURL}/user/edit-credential`, user).pipe();
  }

  public getAllUsers(): Observable<User[] | []> {
    return this.http.get<User[] | []>(`${environment.apiURL}/user/all-users`).pipe(
      tap({
        next: (users: User[] | []) => {
          users.forEach((user: User) => {
            if(JSON.parse(user.ROLE!).includes(ROLE.ADMIN)) {user.info_status="MEMBRE"};
            if(JSON.parse(user.ROLE!).includes(ROLE.BAN)) {user.info_status="BANNI"};
            if(!JSON.parse(user.ROLE!).includes(ROLE.BAN) && !JSON.parse(user.ROLE!).includes(ROLE.ADMIN)) {user.info_status="DEMANDE"};
          })
          this.allUsers$.next(users);
        },
        error: (err) => {
          handleError("[USER SERVICE] getAllUser", err);
        }
      })
    );
  }

  public deleteUser(id_user_update: number, id_current_user: number): Observable<User>  {
    return this.http.delete(`${environment.apiURL}/user/delete/${id_user_update}/${id_current_user}`).pipe();
  }
}
