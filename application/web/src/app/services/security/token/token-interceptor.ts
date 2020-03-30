import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Config } from 'src/ressources/config';

import { AuthService } from '../auth/auth.service';
import { LoaderService } from 'src/app/components/shared';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

    constructor(private tokenStore: TokenStorageService, protected authService: AuthService, protected loaderService: LoaderService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        const token =  this.tokenStore.getToken();
        if ( !!token ) {
            req = this.addToken(req, token.accessToken);
        }
        return next.handle(req).pipe( finalize( () => this.loaderService.hide() ) );
    }

    private addToken(req: HttpRequest<any>, token: string) {
        return req.clone({ headers: req.headers.set(Config.token.header, Config.token.type + token) });
    }

}
