import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {OpposingTeam} from "../../interface/opposing-team.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environement.dev";
import {handleError} from "../handel-error";

@Injectable({
  providedIn: 'root'
})
export class OpposingTeamService {

  public allOpposingTeam$: BehaviorSubject<OpposingTeam[]> = new BehaviorSubject<OpposingTeam[]>([])
  constructor(private http: HttpClient) { }

  public getAllOpposingTeam(): Observable<OpposingTeam[]> {
    return this.http.get<OpposingTeam[]>(`${environment.apiURL}/opposing-team/all`).pipe(
      tap({
        next: (opposingTeam: OpposingTeam[]) => {
          this.allOpposingTeam$.next(opposingTeam)
        },
        error: (err) => {
          handleError("[OPPOSING-TEAM] getAllOpposingTeam", err)
        }
      })
    )
  }
}
