import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Category} from "../../interface/category.interface";
import {FootballPitch} from "../../interface/football-pitch.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environement.dev";
import {MessageService} from "../../messages/MessageService";
import {Handel} from "../handel";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public messageUser: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  public allCategory$: BehaviorSubject<Category[]> = new BehaviorSubject<FootballPitch[]>([]);

  constructor(private http: HttpClient) { }

  /**
   * getAllCategory
   * @return Observable<Category[]>
   */
  public getAllCategory(): Observable<Category[]> {
    const url:string = `${environment.apiURL}/category/all`;
    return this.http.get<Category[] | []>(url).pipe(
      tap({
        next: (categories: Category[] | []) => {
          this.allCategory$.next(categories);
        },
        error: (err) => {
          this.messageUser.next(MessageService.getDataError("catégories"));
          Handel.error("CategoryService", "getAllCategory", this.messageUser.value, err);
          Handel.resetMessage(this.messageUser);
        }
      })
    );
  }
}
