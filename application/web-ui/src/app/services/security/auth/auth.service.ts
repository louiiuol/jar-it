import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Token, AuthLogin, AuthInfo, IToken, UserViewDetails, RegisterInfo } from 'src/app/models';
import { TokenStore } from '../token/token.store';

/**
 * Provides all Http methods related to User Authentication
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

    private readonly register_url = environment.root_url + 'api/auth/signup';
    private readonly token_url = environment.root_url + 'oauth/token';
    private readonly whoami_url = environment.root_url_secured + 'whoami';
    private readonly current = new BehaviorSubject<Token>(null);
    public token$: Observable<Token> = this.current.asObservable();
    public isLoggedIn$: Observable<boolean>;
    public isLoggedOut$: Observable<boolean>;

    public get currentUser(): AuthInfo { return new AuthInfo(this.current.value); }

    constructor(
        private router: Router,
        private http: HttpClient,
        private tokenStore: TokenStore
    ) { // Fetch current user's token
        this.current.next(tokenStore.checkToken() ? tokenStore.getToken() : null);
        // Update Observables depending on Subject state
        this.isLoggedIn$ = this.token$.pipe( map( token => !!token ) );
        this.isLoggedOut$ = this.isLoggedIn$.pipe( map( loggedIn => !loggedIn ) );
    }

    signUp = (info: RegisterInfo): Observable<number> => // Creates new User in database
        this.http.post<number>(this.register_url, info, environment.config.jsonHeader)

    logIn = (data: AuthLogin): Observable<void> => // Log and update current User Subject
        this.authenticate(data, false).pipe( map(token => this.updateSubject(token)) )

    logOut = (): Promise<boolean> => { // Clear current user instance and token
        this.tokenStore.clearToken();
        this.current.next(null);
        return this.router.navigate(['/']);
    }

    whoami = (): Observable<UserViewDetails> =>
        this.http.get<UserViewDetails>(this.whoami_url, environment.config.jsonHeader)

    reloadToken(data: AuthLogin, refresh: boolean): Observable<void> {
        this.tokenStore.clearToken();
        return this.authenticate(data, refresh).pipe(map(token => this.updateSubject(token)));
    }

    isAdmin = (): boolean => // Check is current logged user is admin or not
        (this.current.value.roles.filter(role => role.authority === 'ROLE_ADMIN').length) !== 0

    private authenticate = (data: AuthLogin, refresh: boolean): Observable<IToken> => // Log with credentials and retrieve token
        this.http.post<IToken>(this.token_url, this.generateTokenForm(data, refresh),
            { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) })

    private generateTokenForm = (data: AuthLogin, refresh?: boolean): string =>
        `${refresh ? this.refreshToken(this.current.value.refresh_token) : this.accesToken(data.username, data.password)}&client_id=eTin-web-app`

    private accesToken = (username: string, password: string): string => `grant_type=password&username=${username}&password=${password}`;

    private refreshToken = (refreshToken: string): string => `grant_type=refresh_token&token=${refreshToken}`;

    private updateSubject = (input: IToken): void => // Update current user Subject depending on input
        this.current.next(this.tokenStore.saveToken(input))

}
