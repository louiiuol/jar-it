import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Token, AuthLogin, AuthInfo, IToken, UserViewDetails } from 'src/app/models';
import { TokenStore } from '../token/token.store';

/**
 * Provides all Http methods related to User Authentication
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly register_url = environment.root_url + 'api/auth/signup';
  private readonly token_url = environment.root_url + 'oauth/token';
  private readonly whoami_url = environment.root_url + 'api/secure/whoami';
  private readonly current = new BehaviorSubject<Token>(null);
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
    this.http.post<number>(this.register_url, info, environment.config.jsonHeader)

  logIn = (data: AuthLogin): Observable<void> => // Log and update current User Subject
    this.authenticate(data, false).pipe( map(token => { this.updateSubject(token); }) )

  logOut = (): Promise<boolean> => { // Clear current user instance and token
    this.tokenStore.clearToken();
    this.current.next(null);
    return this.router.navigate(['/']);
  }

  whoami = (): Observable<UserViewDetails> =>
    this.http.get<UserViewDetails>(this.whoami_url, environment.config.jsonHeader)

  reloadToken(data: AuthLogin, refresh: boolean): Observable<void> {
    this.tokenStore.clearToken();
    return this.authenticate(data, refresh).pipe(map(token => { this.updateSubject(token); }));
  }

  private authenticate = (data: AuthLogin, refresh: boolean): Observable<IToken> => {// Log with credentials and retrieve token
    const formUrlEncoded = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
    return this.http.post<IToken>(this.token_url, this.generateUrlFormEncoded(data, refresh), formUrlEncoded);
  }

  private generateUrlFormEncoded = (data: AuthLogin, refresh?: boolean): string => // Generates authentication Form to retrieve
    `grant_type=${refresh ? 'refresh_token' : 'password'}&username=${data.username}&password=${data.password}&client_id=eTin-web-app`

  private updateSubject = (input: IToken): void => // Update current user Subject depending on input
    this.current.next(this.tokenStore.saveToken(input))

}
