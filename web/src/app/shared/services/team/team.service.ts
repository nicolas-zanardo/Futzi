import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "../../../../environments/environement.dev";
import {Team} from "../../interface/team.interface";
import {handleError} from "../handel-error";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  public currentTeam$: BehaviorSubject<Team | null> = new BehaviorSubject<Team | null>(null);
  constructor(
    private http: HttpClient
  ) {}


  public getTeam(): Observable<Team> {
    return this.http.get<Team>(`${environment.apiURL}/team/osny`).pipe(
      tap({
        next: (team: Team) => {
          this.currentTeam$.next(team);
        },
        error: (err) => {
          handleError("[TEAM SERVICE] getTeam", err)
        }
      })
    );
  }

  public updateTeamContact(team: {contact: number, id: number}): Observable<Team> {
    return this.http.put<Team>(`${environment.apiURL}/team/update-osny`, team).pipe();
  }
}
