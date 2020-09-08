import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
    private readonly httpHeader: { headers: HttpHeaders; } =
        { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
    public token$: Observable<Token> = this.current.asObservable();
    public isLoggedIn$: Observable<boolean>;
    public isLoggedOut$: Observable<boolean>;

    public get currentUser(): AuthInfo { return new AuthInfo(this.current.value); }

    constructor(private router: Router, private http: HttpClient, private tokenStore: TokenStore) {
        // Fetch current user's token
        this.current.next(tokenStore.checkToken() ? tokenStore.getToken() : null);
        // Update Observables depending on Subject state
        this.isLoggedIn$ = this.token$.pipe( map( token => !!token ) );
        this.isLoggedOut$ = this.isLoggedIn$.pipe( map( loggedIn => !loggedIn ) );
    }

    signUp = (info: RegisterInfo): Observable<number> => // Creates new User in database
        this.http.post<number>(this.register_url, info, environment.config.jsonHeader)

    logIn = (data: AuthLogin): Observable<void> => // Log and update current User Subject
        this.authenticate(data).pipe( map(token => this.updateSubject(token)) )

    logOut = (): Promise<boolean> => { // Clear current user instance and token
        this.tokenStore.clearToken();
        this.current.next(null);
        return this.router.navigate(['/']);
    }

    whoami = (): Observable<UserViewDetails> =>
        this.http.get<UserViewDetails>(this.whoami_url, environment.config.jsonHeader)

    reloadToken(data: AuthLogin): Observable<IToken> {
        this.tokenStore.clearToken();
        return this.authenticate(data).pipe(tap(token => this.updateSubject(token)));
    }

    refreshToken = (): Observable<IToken> => {
        this.tokenStore.clearToken();
        return this.http.post<IToken>(this.token_url, this.generateRefreshTokenForm(this.current.value.refresh_token), this.httpHeader)
            .pipe(tap(token => this.updateSubject(token)));
    }

    isAdmin = (): boolean => // Check is current logged user is admin or not
        (this.current.value.roles.filter(role => role.authority === 'ROLE_ADMIN').length) !== 0

    private authenticate = (data: AuthLogin): Observable<IToken> => // Log with credentials and retrieve token
        this.http.post<IToken>(this.token_url, this.generateAccessTokenForm(data), this.httpHeader)

    private generateAccessTokenForm = (auth: AuthLogin): string =>
        `grant_type=password&username=${auth.username}&password=${auth.password}&client_id=eTin-web-app`

    private generateRefreshTokenForm = (refreshToken: string): string =>
        `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=eTin-web-app`

    private updateSubject = (input: IToken): void => // Update current user Subject depending on input
        this.current.next(this.tokenStore.saveToken(input))

}
