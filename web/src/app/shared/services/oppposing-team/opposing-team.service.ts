import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {OpposingTeam} from "../../interface/opposing-team.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environement.dev";
import {Handel} from "../handel-error";
import {MessageService} from "../../messages/MessageService";

@Injectable({
  providedIn: 'root'
})
export class OpposingTeamService {

  public messageUser: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public allOpposingTeam$: BehaviorSubject<OpposingTeam[]> = new BehaviorSubject<OpposingTeam[]>([])
  constructor(private http: HttpClient) { }

  /**
   * getAllOpposingTeam
   * @return Observable<OpposingTeam[]>
   */
  public getAllOpposingTeam(): Observable<OpposingTeam[]> {
    return this.http.get<OpposingTeam[]>(`${environment.apiURL}/opposing-team/all`).pipe(
      tap({
        next: (opposingTeam: OpposingTeam[]) => {
          this.allOpposingTeam$.next(opposingTeam)
        },
        error: (err) => {
          this.messageUser.next(MessageService.getDataError("équipe adverse"));
          Handel.error("OpposingTeamService", "getAllOpposingTeam", this.messageUser.value, err);
          Handel.resetMessage(this.messageUser);
        }
      })
    )
  }
}
