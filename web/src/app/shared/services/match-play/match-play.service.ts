import { Injectable } from '@angular/core';
import {MatchPlay} from "../../interface/match-play.inteface";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environement.dev";

@Injectable({
  providedIn: 'root'
})
export class MatchPlayService {

  constructor(private http: HttpClient) { }
  public createSoccerMatch(match: MatchPlay): Observable<MatchPlay> {
    return this.http.post<MatchPlay>(`${environment.apiURL}/match-play/create`, match).pipe();
  }
}
