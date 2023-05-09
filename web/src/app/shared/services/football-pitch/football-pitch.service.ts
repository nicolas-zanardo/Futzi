import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {FootballPitch} from "../../interface/football-pitch.interface";
import {Category} from "../../interface/category.interface";
import {environment} from "../../../../environments/environement.dev";
import {handleError} from "../handel-error";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FootballPitchService {

  public allFootballPitch$: BehaviorSubject<FootballPitch[]> = new BehaviorSubject<FootballPitch[]>([]);

  constructor(private http: HttpClient) { }

  public getAllFootballPitch(): Observable<FootballPitch[]> {
    return this.http.get<Category[]>(`${environment.apiURL}/football-pitch/all`).pipe(
      tap({
        next: (footballPitch: FootballPitch[]) => {
          this.allFootballPitch$.next(footballPitch)
        },
        error: (err) => {
          handleError("[SOCCER-TRAINING] getAllFootballPitch", err);
        }
      })
    )
  }
}
