import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Category} from "../../interface/category.interface";
import {FootballPitch} from "../../interface/football-pitch.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environement.dev";
import {handleError} from "../handel-error";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

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
}
