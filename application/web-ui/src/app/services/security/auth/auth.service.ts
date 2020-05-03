import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Token, AuthLogin, AuthInfo, IToken } from 'src/app/models';
import { TokenStore } from '../token/token.store';

const formUrlEncoded = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
const register_url = environment.root_url + 'api/auth/signup';
const token_url = environment.root_url + 'oauth/token';
const pass = 'password';
const grantFields = {
  password: 'grant_type=' + pass,
  refresh: 'grant_type=refresh_token',
  passField: '&' + pass + '=',
  clientId: '&client_id=eTin-web-app',
};

/**
 * Defines all Http methods related to User Authentication
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  private current = new BehaviorSubject<Token>(null);
  public get currentUser(): AuthInfo { return new AuthInfo(this.current.value); }
  public token$: Observable<Token> = this.current.asObservable();
  public isLoggedIn$: Observable<boolean>;
  public isLoggedOut$: Observable<boolean>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenStore: TokenStore
  ) { // Fetch current user's token
    this.current.next(tokenStore.checkToken() ? tokenStore.getToken() : null);
    // Update Observables depending on Subject state
    this.isLoggedIn$ = this.token$.pipe( map( subject => !!subject ) );
    this.isLoggedOut$ = this.isLoggedIn$.pipe( map( loggedIn => !loggedIn ) );
  }

  signUp = (info: any): Observable<number> => // Creates new User in database
    this.http.post<number>(register_url, info, environment.config.jsonHeader)

  logIn = (data: AuthLogin): Observable<void> => // Log and update current User Subject
    this.authenticate(data).pipe( map(token => { this.updateSubject(token); }) )

  logOut = (): Promise<boolean> => { // Clear current user instance and token
    this.tokenStore.clearToken();
    this.current.next(null);
    return this.router.navigate(['/']);
  }

  private authenticate = (data: AuthLogin): Observable<IToken> => // Log with credentials and retrieve token
    this.http.post<IToken>(token_url, this.generateUrlFormEncoded(data), formUrlEncoded)

  private generateUrlFormEncoded = (data: AuthLogin): string => // Generates authentication Form to retrieve
    grantFields.password + '&username=' + data.username
    + grantFields.passField + data.password + grantFields.clientId

  private updateSubject = (input: IToken): void => // Update current user Subject depending on input
    this.current.next( this.tokenStore.saveToken(input) )

}
