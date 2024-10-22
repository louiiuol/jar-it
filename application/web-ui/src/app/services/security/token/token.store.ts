import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies';
import { IToken, Token } from 'src/app/models';

const cookieFieldName = 'Jarit_Token';

/**
 * Provides Store to save, check, get or delete tokens
 */
@Injectable({ providedIn: 'root' })
export class TokenStore {

  constructor() {}

  saveToken = (input: IToken): Token => {
    const token = new Token(input);
    if (Cookie.check(cookieFieldName)) {
      this.clearToken();
    }
    Cookie.set(cookieFieldName, JSON.stringify(token), token.expires_in);
    return token;
  }

  checkToken = (): boolean => Cookie.check(cookieFieldName);

  getToken(): Token {
    let token: Token = null;
    if (this.checkToken()) {
      const localToken: IToken = JSON.parse(Cookie.get(cookieFieldName));
      token = new Token(localToken);
    }
    return token;
  }

  clearToken = (): void => Cookie.delete(cookieFieldName);

}
