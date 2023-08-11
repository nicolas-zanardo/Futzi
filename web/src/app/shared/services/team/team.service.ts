import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "../../../../environments/environement.dev";
import {Team} from "../../interface/team.interface";
import {Handel} from "../handel-error";
import {MessageService} from "../../messages/MessageService";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  public messageUser: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public currentTeam$: BehaviorSubject<Team | null> = new BehaviorSubject<Team | null>(null);
  public contact$: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  constructor(private http: HttpClient) {}

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
          this.contact$.next(team.id_user);
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
}
