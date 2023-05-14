import { Injectable } from '@angular/core';
import {MatchPlay} from "../../interface/match-play.inteface";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environement.dev";
import {SeasonDate} from "../../interface/season-date";

@Injectable({
  providedIn: 'root'
})
export class MatchPlayService {

  public allMatchPlay$: BehaviorSubject<MatchPlay[]> = new BehaviorSubject<MatchPlay[]>([]);
  public allMatchSeason$: BehaviorSubject<MatchPlay[]> = new BehaviorSubject<MatchPlay[]>([]);

  constructor(private http: HttpClient) { }
  public createSoccerMatch(match: MatchPlay): Observable<MatchPlay> {
    return this.http.post<MatchPlay>(`${environment.apiURL}/match-play/create`, match).pipe();
  }

  public getAllMatchPlay(): Observable<MatchPlay[]> {
    return this.http.get<MatchPlay[]>(`${environment.apiURL}/match-play/get-all`).pipe(
      tap({
        next: (matches: MatchPlay[]) => {
          this.allMatchPlay$.next(matches);
        }
      })
    )
  }

  public deleteMatchPlay(id:number): Observable<MatchPlay> {
    return this.http.delete<MatchPlay>(`${environment.apiURL}/match-play/delete/${id}`).pipe();
  }

  public getAllMatchSeason(seasonDate: SeasonDate): Observable<MatchPlay[]> {
    return this.http.post<MatchPlay[]>(`${environment.apiURL}/match-play/all-match-in-season`, seasonDate).pipe(
      tap({
        next: (matches: MatchPlay[]) => {
          this.allMatchSeason$.next(matches);
        }
      })
    )
  }

  public getNextMatchOfTheDay(): Observable<MatchPlay[]> {
    return  this.http.get<MatchPlay[]>(`${environment.apiURL}/match-play/get-match-of-the-day`).pipe();
  }
}
