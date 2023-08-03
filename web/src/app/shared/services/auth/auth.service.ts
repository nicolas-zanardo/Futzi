import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../interface/user.interface";
import {BehaviorSubject, Observable, of, ReplaySubject, Subscription, switchMap, tap, timer} from "rxjs";
import {environment} from "../../../../environments/environement.dev";
import jwt_decode from "jwt-decode";
import {JwtToken} from "../../interface/jwt-token.interface";
import {Router} from "@angular/router";
import {ResponseLogin} from "../../interface/response.login.interface";
import {Handel} from "../handel-error";
import {SetROLE} from "../../enum/role";
import {SocialCredentialInterface} from "../../interface/social-credential.interface";
import {MessageService} from "../../messages/MessageService";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public messageUser: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public isLogged$ : ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  public subscription: Subscription;
  public currentUser$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public jwtToken: BehaviorSubject<JwtToken> = new BehaviorSubject<JwtToken>({
    isAuthenticated: false,
    token: false,
    role: [],
  });

  constructor(private http: HttpClient, private router: Router) {
    this.initToken();
    this.subscription = this.initTimer();
  }

  /**
   * setValueToken
   * -------------
   * @private
   * @param token
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

  /**
   * getCurrentUser
   * @return Observable<User | null>
   */
  public getCurrentUser(): Observable<User | null> {
    const url:string = `${environment.apiURL}/auth/current-user`;
    this.initToken();
    return this.http.post<User>(url, this.jwtToken.value).pipe(
        tap({
          next : (user:User) => {
            this.currentUser$.next(user);
            if (user) {
              this.isLogged$.next(true);
            } else {
              this.isLogged$.next(false);
              this.logout();
            }
          },
          error: (err) => {
            if(err.status === 498) {
              this.messageUser.next(MessageService.getDataError("Le token a expiré, veuillez vous reconnecter"))
              Handel.error("AuthService", "getCurrentUser", this.messageUser.value, err)
            } else {
              this.messageUser.next(MessageService.getDataError("Erreur inconnue, veuillez contacter l'administrateur"))
              Handel.error("AuthService", "getCurrentUser", this.messageUser.value, err)
            }
            this.isLogged$.next(false);
            this.logout();
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
    return timer(0, 300000).pipe(
      switchMap(() => {
        console.warn(`${new Date()} : TIMER  300000`)
        if (localStorage.getItem('jwt')) {
          return this.http.post<string>(`${environment.apiURL}/auth/refresh-token`, this.jwtToken.value).pipe(
            tap({
              next: (token) => {
                this.setValueToken(token);
                localStorage.setItem('jwt', token);
              } ,
              error: (err) => {
                if(err.status == 498) {
                  this.messageUser.next(MessageService.getTokenUnsuccessful("Votre session a expriré ,veuillez vous reconnecter"));
                  Handel.error("AuthService", this.messageUser.value, "initTimer", err);
                } else {
                  this.messageUser.next(MessageService.getTokenUnsuccessful("Erreur inconnue, veuillez contacter l'administrateur"));
                  Handel.error("AuthService", "initTimer", this.messageUser.value, err);
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
        this.messageUser.next(MessageService.getTokenUnsuccessful("Vous avez été déconnecté"))
        this.resetToken();
        this.currentUser$.next( null);
        localStorage.removeItem('jwt');
        this.logout();
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

  /**
   * createUser
   * @param user
   * @return Observable<User>
   */
  public createUser(user: User): Observable<User> {
    const msg:string = "L'utilisateur";
    const url:string = `${environment.apiURL}/user/create`;
    return this.http.post<User>(url, user).pipe(
      tap({
        next: () => {
          this.messageUser.next(MessageService.createSuccessful(msg));
        },
        error: (err) => {
          this.messageUser.next(MessageService.createUnsuccessful(msg));
          Handel.error("AuthService", "createUser", this.messageUser.value, err)
        }
      }));
  }

  /**
   * connection
   * ------
   * - set value token
   * - set Jwt
   * @return Observable<SigninModel | string | null>
   * @param credentials
   */
  public login(credentials: { login: string, password: string }): Observable<ResponseLogin | string | null> {
    const url:string = `${environment.apiURL}/auth/login`;
    return this.http.post<ResponseLogin>(url, credentials).pipe(
      tap({
        next: (resp) => {
          this.messageUser.next(MessageService.loginSuccessful);
          this.createToken(resp);
        },
        error: (err) => {
          this.messageUser.next(MessageService.loginUnsuccessful);
        }
      })
    )
  }


  /**
   * socialLogin
   * @param socialCredential SocialCredentialModel
   */
  public socialLogin(socialCredential :SocialCredentialInterface): Observable<ResponseLogin | string | null> {
    return this.http.post<ResponseLogin>(`${environment.apiURL}/auth/social-valid-token`, socialCredential).pipe(
      tap({
        next: (resp: ResponseLogin) => {
          this.messageUser.next(MessageService.loginSuccessful);
          this.createToken(resp);
        },
        error: (err) => {
          if(err.status == 401) {
            this.messageUser.next(MessageService.loginError("Vous n'avez pas les droit de connexion"));
            Handel.error("AuthService", "socialLogin", this.messageUser.value, err);
          } else {
            this.messageUser.next(MessageService.loginError("contactez l'administrateur"));
            Handel.error("AuthService", "socialLogin", this.messageUser.value, err)
          }
        }
      })
    )
  }

  /**
   * findRoleUser
   * @param ROLE_AUTH
   */
  public findRoleUser(ROLE_AUTH: string): boolean {
    let user: User | null = this.currentUser$.value;
    let haveRole: boolean = false;
    if(user){
      if(user.ROLE) {
        for (let role of JSON.parse(user.ROLE)) {
          if(ROLE_AUTH === role) {
            haveRole = true;
          }
        }
      }
    }
    return haveRole;
  }

  public setInfoStatueByRole(ROLE: string): string {
    switch (ROLE) {
      case SetROLE.BANNI:
        return 'BANNI';
      case SetROLE.MEMBRE:
        return 'MEMBRE';
      case SetROLE.DEMANDE:
        return 'DEMANDE';
    }
    return "DELETE";
  }

  public setRoleByInfoStatus(info_status: string): string {
    switch (info_status) {
      case 'BANNI':
        return SetROLE.BANNI;
      case 'MEMBRE':
        return SetROLE.MEMBRE;
      case 'DEMANDE':
        return SetROLE.DEMANDE;
    }
    return SetROLE.SUPPRIMER;
  }

  /**
   * logout
   * ------
   *  - Remove JWT
   *  - reset TOKEN
   *  - Redirect route
   */
  public logout() {
    localStorage.removeItem('jwt');
    this.resetToken();
    this.currentUser$.next( null);
    this.initTimer();
    console.warn(`INFO : USER IS LOGGED ${new Date()}`)
    this.router.navigateByUrl('/connexion').then();
  }

  private createToken(resp: ResponseLogin) {
    this.setValueToken(resp.token);
    localStorage.setItem('jwt', resp.token);
    this.currentUser$.next(resp.user);
    this.isLogged$.next(true);
  }

}
