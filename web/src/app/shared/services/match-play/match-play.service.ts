import { Injectable } from '@angular/core';
import {MatchPlay} from "../../interface/match-play.inteface";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environement.dev";

@Injectable({
  providedIn: 'root'
})
export class MatchPlayService {

  public allMatchPlay$: BehaviorSubject<MatchPlay[]> = new BehaviorSubject<MatchPlay[]>([]);

  constructor(private http: HttpClient) { }
  public createSoccerMatch(match: MatchPlay): Observable<MatchPlay> {
    return this.http.post<MatchPlay>(`${environment.apiURL}/match-play/create`, match).pipe();
  }

  public getAllMatchPlay(): Observable<MatchPlay[]> {
    return this.http.get<MatchPlay[]>(`${environment.apiURL}/match-play/get-all`).pipe(
      tap({
        next: (match: MatchPlay[]) => {
          this.allMatchPlay$.next(match);
        }
      })
    )
  }
}
