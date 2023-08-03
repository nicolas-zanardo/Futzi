import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {FootballPitch} from "../../interface/football-pitch.interface";
import {Category} from "../../interface/category.interface";
import {environment} from "../../../../environments/environement.dev";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "../../messages/MessageService";
import {Handel} from "../handel-error";

@Injectable({
  providedIn: 'root'
})
export class FootballPitchService {

  public messageUser: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public allFootballPitch$: BehaviorSubject<FootballPitch[]> = new BehaviorSubject<FootballPitch[]>([]);

  constructor(private http: HttpClient) { }

  /**
   * getAllFootballPitch
   * @return Observable<FootballPitch[]>
   */
  public getAllFootballPitch(): Observable<FootballPitch[]> {
    return this.http.get<Category[]>(`${environment.apiURL}/football-pitch/all`).pipe(
      tap({
        next: (footballPitch: FootballPitch[]) => {
          this.allFootballPitch$.next(footballPitch)
        },
        error: (err) => {
          this.messageUser.next(MessageService.getDataError("Terrain de foot"));
          Handel.error("FootballPitchService", "getAllFootballPitch", this.messageUser.value, err)
        }
      })
    )
  }
}
