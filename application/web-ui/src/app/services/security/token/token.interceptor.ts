import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TokenStore } from './token.store';
import { LoaderService } from '../../loader/loader.service';

/**
 * Provides Interceptor to clone request with JWT header
 */
@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenStore: TokenStore, private loader: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.show();
    if (this.tokenStore.checkToken()) {
      const token = this.tokenStore.getToken();
      req = this.addHeader(req, token.access_token);
    }
    return next.handle(req).pipe(finalize( () => this.loader.hide()));
  }

  addHeader = (req: HttpRequest<any>, token: string): HttpRequest<any> =>
    req.clone({ headers: req.headers.set('Authorization', `bearer${token}`) })

}
