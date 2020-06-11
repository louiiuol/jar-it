import { Token } from '../token/token.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthInfo } from '../..';
import { tokenMock } from '.';

export class AuthServiceMockSimple { // Mock to reproduce relevant behaviors for this service
    private subject = new BehaviorSubject<Token>(null);
    public token$: Observable<Token> = this.subject.asObservable();
    public isLoggedIn$: Observable<boolean>;
    constructor() {
        this.isLoggedIn$ = this.token$.pipe(map(subject => !!subject));
    }
    logIn(data: AuthInfo) {
        const token: Token = new Token(tokenMock);
        this.subject.next(token);
    }
    logOut() { this.subject.next(null); }
}

export class AuthServiceMockFull {
    private subject = new BehaviorSubject<Token>(null);
    public get currentUser(): Token { return new Token(tokenMock); }
    public token$: Observable<Token> = this.subject.asObservable();
    public isLoggedIn$: Observable<boolean>;
    public isLoggedOut$: Observable<boolean>;
    constructor() {
        const token: Token = new Token(tokenMock);
        this.subject.next(token);
        this.isLoggedIn$ = this.token$.pipe(map(subject => !!subject));
        this.isLoggedOut$ = this.isLoggedIn$.pipe( map( loggedIn => !loggedIn ) );
    }
    logIn(data: AuthInfo) {
        const token: Token = new Token(tokenMock);
        this.subject.next(token);
    }
    logOut() { this.subject.next(null); }
}
