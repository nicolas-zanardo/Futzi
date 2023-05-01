import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {first, map, mapTo, Observable, of, switchMap} from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";
import {User} from "../../interface/user.interface";

@Injectable({
  providedIn: 'root'
})
export class DataUserGuard implements CanActivate {

  constructor(private authService: AuthService) {
  }
  canActivate(): Observable<true> {
    if(localStorage.getItem('jwt')) {
      return this.authService.currentUser$.pipe(
        first(),
        switchMap((user: User | null): Observable<true> => {
          if(!user) { return this.authService.getCurrentUser().pipe(map(() => {return true})); }
          else { return of(true); }
        })
      );
    } else {
      return this.authService.jwtToken.pipe(
        switchMap((): Observable<true> => {
          this.authService.isLogged$.next(false);
          return of(true);
        })
      )
    }

  }

}
