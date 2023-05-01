import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../interface/user.interface";
import {BehaviorSubject, Observable, of, ReplaySubject, Subscription, switchMap, tap, timer} from "rxjs";
import {environment} from "../../../../environments/environement.dev";
import jwt_decode from "jwt-decode";
import {JwtToken} from "../../model/jwt-token.model";
import {Router} from "@angular/router";
import {ResponseLogin} from "../../interface/response-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public subscription: Subscription;
  public currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject<JwtToken>({
    isAuthenticated: false,
    token: false,
    role: [],
  });

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.initToken();
    this.subscription = this.initTimer();
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`
      ERROR : ${operation}
      STATUS : ${error.status}
      MESSAGE : ${error.message}
      FULL TEXT : ${error}
      `)
      return of(result as T);
    };
  }

  /**
   * setValueToken
   * -------------
   * @param token: string
   * @private
   */
  private setValueToken(token: string): void {
    // Decode JWT
    let decoded: any = jwt_decode(token);
    this.jwtToken.next({
      isAuthenticated: true,
      token: token,
      role: decoded.role,
    });
  }

  public getCurrentUser(): Observable<User | null> {
    this.initToken();
    return this.http.post<User>(`${environment.apiURL}/auth/current-user`, this.jwtToken.value).pipe(
        tap({
          next : (user:User) => {
            this.currentUser$.next(user);
            if (user) {
              this.isLogged$.next(true);
            } else {
              this.isLogged$.next(false);
            }
          },
          error: (err) => {
            if(err.status === 423) {
              this.handleError("[AUTH SERVICE] getCurrentUser : The TOKEN have been expired, Disconnect user logged");
              this.isLogged$.next(false);
            } else {
              this.handleError("[AUTH SERVICE] getCurrentUser : undefined");
              this.isLogged$.next(false);
            }
            return this.logout();
          }
          }));
  }

  /**
   * resetToken
   * ----------
   * Reset value of token
   * @private
   */
  private resetToken(): void {
    this.jwtToken.next({
      isAuthenticated: false,
      token: false,
      role: [],
    });
  }

  /**
   * initTimer
   * ---------
   * Refresh Token
   * - VALUE_OF_TIMER Timer( EX: 5min pour la première observation puis 15min pour les prochaines)
   * - getToken in localstorage
   * * if(!jwt) return null
   * * if(jwt) return request and set value in token and in localstorage
   * * if(err) delete jwt
   */
  public initTimer() {
    return timer(300000, 300000).pipe(
      switchMap(() => {
        if (localStorage.getItem('jwt')) {
          return this.http.post<string>(`${environment.apiURL}/auth/refresh-token`, this.jwtToken.value).pipe(
            tap({
              next: (token) => {
                this.setValueToken(token);
                localStorage.setItem('jwt', token);
              } ,
              error: (err) => {
                if(err.status == 423) {
                  this.handleError("[AUTH SERVICE] initTimer : The TOKEN have been expired, Disconnect user logged");
                } else {
                  this.handleError("[AUTH SERVICE] initTimer : undefined")
                }
                return this.logout();
              }
            })
          );
        } else {
          return of(null);
        }
      })
    ).subscribe({
      error : ()=> {
        this.resetToken();
        this.currentUser$.next( null);
        localStorage.removeItem('jwt');
        this.router.navigate([`/connection`])
          .then();
      }
    });
  }

  /**
   * initToken
   * ---------
   * if(jwt)
   * set or Delete value token
   */
  public initToken(): void {
    const token = localStorage.getItem('jwt');
    if (token) {
      this.setValueToken(token);
    } else {
      this.currentUser$.next( null);
      this.resetToken();
    }
  }

  // Create a new user
  public createUser(user: User): Observable<User> {
    return this.http.post<User>(`${environment.apiURL}/user/create`, user).pipe( tap( ));
  }

  /**
   * connection
   * ------
   * - set value token
   * - set Jwt
   * @return Observable<SigninModel | string | null>
   * @param credentials: object<string>
   */
  public login(credentials: { login: string, password: string }): Observable<ResponseLogin | string | null> {
    return this.http.post<ResponseLogin>(`${environment.apiURL}/auth/login`, credentials).pipe(
      tap((resp) => {
        this.setValueToken(resp.token);
        localStorage.setItem('jwt', resp.token);
        this.currentUser$.next(resp.user);
        this.isLogged$.next(true);
      })
    )
  }

  public findRoleUser(ROLE_AUTH: string): boolean {
    let user: User | null = this.currentUser$.value;
    let haveRole: boolean = false;
    if(user){
      for (let role of JSON.parse(user!.ROLE)) {
        if(ROLE_AUTH === role) {
          haveRole = true;
        }
      }
    }
    return haveRole;
  }

  /**
   * logout
   * ------
   *  - Remove JWT
   *  - reset TOKEN
   *  - Redirect route
   */
  public logout(): void {
    localStorage.removeItem('jwt');
    this.resetToken();
    this.currentUser$.next( null);
    this.router.navigate(['/connection']).then();
    this.initTimer();
    console.warn(`INFO : USER IS LOGGED ${new Date()}`)
  }

}
