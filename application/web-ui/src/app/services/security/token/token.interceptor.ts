import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { finalize, catchError, switchMap, filter, take } from 'rxjs/operators';
import { TokenStore } from './token.store';
import { LoaderService } from '../../loader/loader.service';
import { AuthService } from '../auth/auth.service';
import { IToken } from 'src/app/models';

/**
 * Provides Interceptor to clone request with JWT header
 */
@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private tokenStore: TokenStore, private loader: LoaderService, private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loader.show();
        if (this.tokenStore.checkToken()) {
            const token = this.tokenStore.getToken();
            req = this.addHeader(req, token.access_token);
        }
        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                return this.handle401Error(req, next);
            } else {
                return throwError(error);
            }
        }), finalize(() => this.loader.hide()));
    }

    private addHeader = (req: HttpRequest<any>, token: string): HttpRequest<any> =>
        req.clone({ headers: req.headers.set('Authorization', `bearer ${token}`) })

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            return this.authService.refreshToken().pipe(
                switchMap((token: IToken) => {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(token.access_token);
                return next.handle(this.addHeader(request, token.access_token));
            }));
        } else {
            return this.refreshTokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(jwt => {
                return next.handle(this.addHeader(request, jwt));
            }));
        }
    }

}
