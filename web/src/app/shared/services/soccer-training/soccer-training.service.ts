import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "../../../../environments/environement.dev";
import {handleError} from "../handel-error";
import {FootballPitch} from "../../interface/football-pitch.interface";
import {SoccerTraining} from "../../interface/soccer-training.interface";
import {Category} from "../../interface/category.interface";


@Injectable({
  providedIn: 'root'
})
export class SoccerTrainingService {


  public allSoccerTraining$: BehaviorSubject<SoccerTraining[]> = new BehaviorSubject<SoccerTraining[]>([]);
  public allFootballPitch$: BehaviorSubject<FootballPitch[]> = new BehaviorSubject<FootballPitch[]>([]);
  public allCategory$: BehaviorSubject<Category[]> = new BehaviorSubject<FootballPitch[]>([]);

  constructor(private http: HttpClient) { }

  public getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[] | []>(`${environment.apiURL}/category/all`).pipe(
      tap({
        next: (categories: Category[] | []) => {
          this.allCategory$.next(categories);
        },
        error: (err) => {
          handleError("[SOCCER-TRAINING] getAllCategory", err);
        }
      })
    );
  }

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

  public createSoccerTraining(request : SoccerTraining): Observable<SoccerTraining> {
    return this.http.post<SoccerTraining>(`${environment.apiURL}/training/create`, request).pipe()
  }

  public getAllSoccerTraining(): Observable<SoccerTraining[]> {
    return this.http.get<SoccerTraining[]>(`${environment.apiURL}/training/all`).pipe(
      tap({
        next: (soccerTraining: SoccerTraining[]) => {
          this.allSoccerTraining$.next(soccerTraining)
        }
      })
    )
  }

  public deleteSoccerTraining(id: number): Observable<SoccerTraining> {
    return this.http.delete<SoccerTraining>(`${environment.apiURL}/training/delete/${id}`).pipe();
  }

  public countTrainingByCategory(): Observable<{category: string, number_training: number}[]> {
    return this.http.get<{category: string, number_training: number}[]>(`${environment.apiURL}/training/count-training-by-category`).pipe();
  }

}



