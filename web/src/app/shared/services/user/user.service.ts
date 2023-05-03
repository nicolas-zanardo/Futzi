import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

import {environment} from "../../../../environments/environement.dev";
import {User} from "../../interface/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public editUserInformation(user: User): Observable<User | null> {
    return this.http.put<User>(`${environment.apiURL}/user/edit-info`, user).pipe();
  }

  public editUserCredential(user: User): Observable<User | null> {
    return this.http.put<User>(`${environment.apiURL}/user/edit-credential`, user).pipe();
  }
}
