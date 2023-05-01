import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {first, Observable, tap} from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";
import {ROLE} from "../../enum/role";

@Injectable({
  providedIn: 'root'
})
export class RoleUserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.authService.isLogged$.pipe(
      first(),
      tap((isLogged: boolean) => {
        if (isLogged) {
          for (const ROLE_TOKEN of JSON.parse(this.authService.currentUser$.value!.ROLE)) {
            if (ROLE_TOKEN === (ROLE.USER || ROLE.ADMIN)) {
              return true;
            } else {
              //TODO implement BAN URL
              this.router.navigateByUrl('/connection').then();
              return false;
            }
          }
        } else {
          this.router.navigateByUrl('/connection').then();
          return false;
        }
        return false;
      })
    )
  }
}
