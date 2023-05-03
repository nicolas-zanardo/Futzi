import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {first, Observable, tap} from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";
import {ROLE} from "../../enum/role";

@Injectable({
  providedIn: 'root'
})
export class RoleBanGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.authService.isLogged$.pipe(
      first(),
      tap((isLogged: boolean) => {
        if (isLogged && this.authService.currentUser$.value?.ROLE) {
          for (const ROLE_TOKEN of JSON.parse(this.authService.currentUser$.value.ROLE)) {
            if (ROLE_TOKEN === ROLE.BAN) {
              return true;
            }
          }
        } else {
          this.router.navigateByUrl('/member').then();
          return false;
        }
        return false;
      })
    )
  }

}
