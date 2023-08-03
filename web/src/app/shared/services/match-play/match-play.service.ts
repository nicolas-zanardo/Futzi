import { Injectable } from '@angular/core';
import {MatchPlay} from "../../interface/match-play.inteface";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environement.dev";
import {SeasonDateInterface} from "../../interface/season-date.interface";
import {MessageService} from "../../messages/MessageService";
import {Handel} from "../handel-error";

@Injectable({
  providedIn: 'root'
})
export class MatchPlayService {

  public messageUser: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public allMatchPlay$: BehaviorSubject<MatchPlay[]> = new BehaviorSubject<MatchPlay[]>([]);
  public allMatchSeason$: BehaviorSubject<MatchPlay[]> = new BehaviorSubject<MatchPlay[]>([]);

  constructor(private http: HttpClient) { }

  /**
   * createSoccerMatch
   * @param match
   * @return Observable<MatchPlay>
   */
  public createSoccerMatch(match: MatchPlay): Observable<MatchPlay> {
    const msg:string = "du match de football";
    const url:string = `${environment.apiURL}/match-play/create`;
    return this.http.post<MatchPlay>(url, match).pipe(
      tap({
        next: () => {
          this.messageUser.next(MessageService.createSuccessful(msg));
        },
        error: (err) => {
          this.messageUser.next(MessageService.createUnsuccessful(msg));
          Handel.error("MatchPlayService", "createSoccerMatch", this.messageUser.value, err);
        }
      })
    );
  }

  /**
   * getAllMatchPlay
   * @return Observable<MatchPlay[]>
   */
  public getAllMatchPlay(): Observable<MatchPlay[]> {
    const url:string = `${environment.apiURL}/match-play/get-all`
    return this.http.get<MatchPlay[]>(url).pipe(
      tap({
        next: (matches: MatchPlay[]) => {
          this.allMatchPlay$.next(matches);
        },
        error: (err) => {
          this.messageUser.next(MessageService.getDataError("match joué"));
          Handel.error("MatchPlayService", "getAllMatchPlay", this.messageUser.value, err);
        }
      })
    )
  }

  /**
   * deleteMatchPlay
   * @param id
   * @return Observable<MatchPlay>
   */
  public deleteMatchPlay(id:number): Observable<MatchPlay> {
    const url:string = `${environment.apiURL}/match-play/delete/${id}`;
    const msg: string = "du match";
    return this.http.delete<MatchPlay>(url).pipe(
      tap({
        next: () => {
          this.messageUser.next(MessageService.deleteSuccessful(msg));
        },
        error: (err) => {
          this.messageUser.next(MessageService.deleteUnsuccessful(msg));
          Handel.error("MatchPlayService", "deleteMatchPlay", this.messageUser.value, err);
        }
      })
    );
  }

  /**
   * getAllMatchSeason
   * @param seasonDate
   * @return Observable<MatchPlay[]>
   */
  public getAllMatchSeason(seasonDate: SeasonDateInterface): Observable<MatchPlay[]> {
    return this.http.post<MatchPlay[]>(`${environment.apiURL}/match-play/all-match-in-season`, seasonDate).pipe(
      tap({
        next: (matches: MatchPlay[]) => {
          this.allMatchSeason$.next(matches);
        },
        error: (err) => {
          this.messageUser.next(MessageService.getDataError("match de la saison"));
          Handel.error("MatchPlayService", "getAllMatchSeason", this.messageUser.value, err);
        }
      })
    )
  }

  /**
   * getNextMatchOfTheDay
   * @return Observable<MatchPlay[]>
   */
  public getNextMatchOfTheDay(): Observable<MatchPlay[]> {
    const url:string = `${environment.apiURL}/match-play/get-match-of-the-day`;
    return  this.http.get<MatchPlay[]>(url).pipe(
      tap({
        error: (err) => {
          this.messageUser.next(MessageService.getDataError("prochain match du jour"));
          Handel.error("MatchPlayService", "getNextMatchOfTheDay", this.messageUser.value, err);
        }
      })
    );
  }
}
