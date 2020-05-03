import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStore } from './token.store';

const headerConf = {
  type: 'bearer',
  header: 'Authorization'
};

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenStore: TokenStore
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.tokenStore.checkToken()) {
      const token = this.tokenStore.getToken();
      req = this.addHeader(req, token.access_token);
    }
    return next.handle(req);
  }

  addHeader = (req: HttpRequest<any>, token: string): HttpRequest<any> =>
    req.clone({ headers: req.headers.set(headerConf.header, headerConf.type + token) })

}
