import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "../../../../environments/environement.dev";
import {SoccerTraining} from "../../interface/soccer-training.interface";
import {Handel} from "../handel";
import {MessageService} from "../../messages/MessageService";
import {TrainingByCategoryInterface} from "../../interface/training-by-category.interface";


@Injectable({
  providedIn: 'root'
})
export class SoccerTrainingService {

  public messageUser: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  public allSoccerTraining$: BehaviorSubject<SoccerTraining[]> = new BehaviorSubject<SoccerTraining[]>([]);
  public trainingByCat$: BehaviorSubject<TrainingByCategoryInterface[]> = new BehaviorSubject<TrainingByCategoryInterface[]>([]);

  constructor(private http: HttpClient) { }

  /**
   * createSoccerTraining
   * @param request SoccerTraining
   * @return Observable<SoccerTraining>
   */
  public createSoccerTraining(request : SoccerTraining): Observable<SoccerTraining> {
    const msg:string = "L'entrainement";
    const url: string = `${environment.apiURL}/training/create`;
    return this.http.post<SoccerTraining>(url, request).pipe(
      tap({
        next: () => {
          this.messageUser.next(MessageService.createSuccessful(msg));
          Handel.resetMessage(this.messageUser);
        },
        error: (err) => {
          this.messageUser.next(MessageService.createUnsuccessful(msg));
          Handel.error("SoccerTrainingService", "createSoccerTraining", this.messageUser.value, err);
          Handel.resetMessage(this.messageUser);
        }
      })
    )
  }

  /**
   * getAllSoccerTraining
   * @return Observable<SoccerTraining[]>
   */
  public getAllSoccerTraining(): Observable<SoccerTraining[]> {
    return this.http.get<SoccerTraining[]>(`${environment.apiURL}/training/all`).pipe(
      tap({
        next: (soccerTraining: SoccerTraining[]) => {
          this.allSoccerTraining$.next(soccerTraining);
        },
        error: (err) => {
          this.messageUser.next(MessageService.getDataError("recupération des entrainements"))
          Handel.error("SoccerTrainingService", "getAllSoccerTraining", this.messageUser.value, err);
          Handel.resetMessage(this.messageUser);
        }
      })
    )
  }

  /**
   * deleteSoccerTraining
   * @param id number
   * @return Observable<SoccerTraining>
   */
  public deleteSoccerTraining(id: number): Observable<SoccerTraining> {
    const msg:string = "entrainement de foot";
    const url:string = `${environment.apiURL}/training/delete/${id}`;
    return this.http.delete<SoccerTraining>(url).pipe(
      tap({
        next: () => {
          this.messageUser.next(MessageService.deleteSuccessful(msg));
          Handel.resetMessage(this.messageUser);
        },
        error: (err) => {
          this.messageUser.next(MessageService.deleteUnsuccessful(msg));
          Handel.error("SoccerTrainingService", "deleteSoccerTraining", this.messageUser.value, err);
          Handel.resetMessage(this.messageUser);
        }
      })
    );
  }

  /**
   * countTrainingByCategory
   * @return Observable<{category: string, number_training: number}[]>
   */
  public countTrainingByCategory(): Observable<{category: string, number_training: number}[]> {
    return this.http.get<{category: string, number_training: number}[]>(`${environment.apiURL}/training/count-training-by-category`).pipe(
      tap({
        error: (err) => {
          this.messageUser.next(MessageService.getDataError("comptage du nombre de catégories"));
          Handel.error("SoccerTrainingService", "countTrainingByCategory", this.messageUser.value, err);
          Handel.resetMessage(this.messageUser);
        }
      })
    );
  }

  /**
   * trainingByCategory
   * @return Observable<TrainingByCategoryInterface|[]>
   */
  public trainingByCategory(): Observable<TrainingByCategoryInterface[]> {
    return this.http.get<TrainingByCategoryInterface[]>(`${environment.apiURL}/training/training-by-category`).pipe(
      tap({
        next: (trainingByCat: TrainingByCategoryInterface[]) => {
          this.trainingByCat$.next(trainingByCat);
        },
        error: (err) => {
          this.messageUser.next(MessageService.getDataError("récuperation des entrainement par catégories"));
          Handel.error("SoccerTrainingService", "trainingByCategory", this.messageUser.value, err);
          Handel.resetMessage(this.messageUser);
        }
      })
    )
  }

}



