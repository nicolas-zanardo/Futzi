import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {first, Observable, tap} from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";
import {ROLE} from "../../enum/role";

@Injectable({
  providedIn: 'root'
})
export class RoleAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.authService.isLogged$.pipe(
      first(),
      tap((isLogged: boolean) => {
        if (isLogged && this.authService.currentUser$.value?.ROLE) {
          if(this.authService.findRoleUser(ROLE.BAN)) {
            this.router.navigateByUrl('/member/ban').then();
            return false;
          }
          if(this.authService.findRoleUser(ROLE.ADMIN)) {return true;}
          this.router.navigateByUrl('/connection').then();
          return false;
        } else {
          this.router.navigateByUrl('/connection').then();
          return false;
        }
        return false;
      })
    )
  }

}
