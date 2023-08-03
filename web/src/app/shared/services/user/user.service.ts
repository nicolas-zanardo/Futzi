import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {environment} from "../../../../environments/environement.dev";
import {User} from "../../interface/user.interface"
import {ROLE} from "../../enum/role";
import {SocialCredentialInterface} from "../../interface/social-credential.interface";
import {Handel} from "../handel-error";
import {MessageService} from "../../messages/MessageService";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public messageUser: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public allUsers$: BehaviorSubject<User[] | []> = new BehaviorSubject<User[] | []>([]);
  public userSocialToken$: BehaviorSubject<SocialCredentialInterface> =
    new BehaviorSubject<SocialCredentialInterface>({tokenURL: "", tokenTimeValidity: 0});

  constructor(private http: HttpClient) {}

  /**
   * editUserInformation
   * @param user User
   * @return Observable<User | null>
   */
  public editUserInformation(user: User): Observable<User | null> {
    const msg: string = "du vos informations personnelle";
    const url: string = `${environment.apiURL}/user/edit-info`;
    return this.http.put<User>(url, user).pipe(
      tap({
        next: () => {
          this.messageUser.next(MessageService.updateSuccessful(msg));
        },
        error: (err) => {
          this.messageUser.next(MessageService.updateUnsuccessful(msg));
          Handel.error("UserService", "editUserInformation", this.messageUser.value, err);
        }
      })
    );
  }

  /**
   * editUserROLE
   * @param user User
   * @return Observable<User>
   */
  public editUserROLE(user: User): Observable<User> {
    const msg: string = "du ROLE utilisateur";
    const url: string = `${environment.apiURL}/user/edit-role`;
    return this.http.put<User>(url, user).pipe(
      tap({
        next: () => {
          this.messageUser.next(MessageService.updateSuccessful(msg));
        },
        error: (err) => {
          this.messageUser.next(MessageService.updateUnsuccessful(msg));
          Handel.error("UserService", "editUserROLE", this.messageUser.value, err);
        }
      })
    );
  }

  /**
   * editUserCredential
   * @param user User
   * @return Observable<User | null>
   */
  public editUserCredential(user: User): Observable<User | null> {
    const msg: string = "des informations de connexion";
    const url: string = `${environment.apiURL}/user/edit-credential`;
    return this.http.put<User>(url, user).pipe(
      tap({
        next: () => {
          this.messageUser.next(MessageService.updateSuccessful(msg));
        },
        error: (err) => {
          this.messageUser.next(MessageService.updateUnsuccessful(msg));
          Handel.error("UserService", "editUserCredential", this.messageUser.value, err);
        }
      })
    );
  }

  /**
   * getAllUsers
   * @return Observable<User[] | []>
   */
  public getAllUsers(): Observable<User[] | []> {
    const url: string = `${environment.apiURL}/user/all-users`;
    return this.http.get<User[] | []>(url).pipe(
      tap({
        next: (users: User[] | []) => {
          users.forEach((user: User) => {
            if(JSON.parse(user.ROLE!).includes(ROLE.ADMIN)) {user.info_status="MEMBRE"}
            if(JSON.parse(user.ROLE!).includes(ROLE.BAN)) {user.info_status="BANNI"}
            if(!JSON.parse(user.ROLE!).includes(ROLE.BAN) && !JSON.parse(user.ROLE!).includes(ROLE.ADMIN)) {user.info_status="DEMANDE"}
          })
          this.allUsers$.next(users);
        },
        error: (err) => {
          this.messageUser.next(MessageService.getDataError("recupération des utilisateurs"));
          Handel.error("UserService", "getAllUsers", this.messageUser.value, err);
        }
      })
    );
  }

  /**
   * getUserByTokenURL
   * @param token string | null | undefined
   * @return Observable<SocialCredentialInterface | null>
   */
  public getUserByTokenURL(token: string | null | undefined) : Observable<SocialCredentialInterface | null> {
    const url: string = `${environment.apiURL}/user/token-url/${token}`;
    return this.http.get<SocialCredentialInterface | null>(url).pipe(tap({
      next: (user) => {
        if(user) {
          this.userSocialToken$.next(user);
        }
      },
      error: (err) => {
        this.messageUser.next(MessageService.getDataError("recupération de l'utilisateur par le token"));
        Handel.error("UserService", "getUserByTokenURL", this.messageUser.value, err);
      }
    }));
  }

  /**
   * deleteUser
   * @param id_user_update number
   * @param id_current_user number
   * @return Observable<User>
   */
  public deleteUser(id_user_update: number, id_current_user: number): Observable<User>  {
    const msg:string = "l'utilisateur"
    const url: string = `${environment.apiURL}/user/delete/${id_user_update}/${id_current_user}`;
    return this.http.delete(url).pipe(
      tap({
        next: () => {
          this.messageUser.next(MessageService.deleteSuccessful(msg));
        },
        error: (err) => {
          this.messageUser.next(MessageService.deleteUnsuccessful(msg));
          Handel.error("UserService", "deleteUser", this.messageUser.value, err);
        }
      })
    );
  }
}
