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

  constructor(private http: HttpClient) { }

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



