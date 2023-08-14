import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "../../../../environments/environement.dev";
import {Team} from "../../interface/team.interface";
import {Handel} from "../handel-error";
import {MessageService} from "../../messages/MessageService";
import {User} from "../../interface/user.interface";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  public messageUser: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public currentTeam$: BehaviorSubject<Team | null> = new BehaviorSubject<Team | null>(null);
  public contactById$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public contact$: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);

  constructor(private http: HttpClient) {
    if(this.contact$.value === null) this.getTeam().subscribe();
  }

  /**
   * getTeam
   * @return Observable<Team>
   */
  public getTeam(): Observable<Team> {
    const url: string = `${environment.apiURL}/team/${environment.teamName}`
    return this.http.get<Team>(url).pipe(
      tap({
        next: (team: Team) => {
          this.currentTeam$.next(team);
          this.contactById$.next(team.id_user);
          this.getContactTeam(team.id_user).subscribe();
          },
        error: (err) => {
          this.messageUser.next(MessageService.getDataError("récuperation des équipes"));
          Handel.error("TeamService", "getTeam", this.messageUser.value, err);
          Handel.resetMessage(this.messageUser);
        }
      })
    );
  }

  /**
   * updateTeamContact
   * @param team {contact: number, id: number}
   * @return Observable<Team>
   */
  public updateTeamContact(team: {contact: number, id: number}): Observable<Team> {
    const msg:string = "du contact de l'équipe";
    const url: string = `${environment.apiURL}/team/update`;
    return this.http.put<Team>(url, team).pipe(
      tap({
        next: () => {
          this.messageUser.next(MessageService.updateSuccessful(msg));
          this.getContactTeam(team.contact).subscribe();
          Handel.resetMessage(this.messageUser);
        },
        error: (err) => {
          this.messageUser.next(MessageService.updateUnsuccessful(msg));
          Handel.error("TeamService", "updateTeamContact", this.messageUser.value, err);
          Handel.resetMessage(this.messageUser);
        }
      })
    );
  }

  /**
   * getContactTeam
   * @param id
   */
  public getContactTeam(id:number) : Observable<User|null> {
    const url:string  =  `${environment.apiURL}/user/contact/${id}`;
    return this.http.get<User|null>(url).pipe(
      tap({
        next: (user:User|null) => {
          this.contact$.next(user);
        },
        error: (err) => {
          this.messageUser.next(MessageService.updateUnsuccessful("impossible de récupérer l'utilisateur"));
          Handel.error("TeamService", "getContactTeam", this.messageUser.value, err);
          Handel.resetMessage(this.messageUser);
        }
      })
    )
  }
}
