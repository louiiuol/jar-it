import { Injectable } from '@angular/core';

import { Cookie } from 'ng2-cookies';
import { Token } from '../../../models';
import { Config } from 'src/resources/config';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {

  constructor() {}

  private fieldName = Config.token.cookieFieldName;

  saveToken = (input: any): void => {
    const token: Token = this.mapToken(input);
    if ( !!token ) { Cookie.set(this.fieldName, JSON.stringify(token), token.expiresIn ); }
  }

  checkToken = (): boolean => Cookie.check(this.fieldName);

  getToken = (): Token => this.checkToken()
      ? JSON.parse(Cookie.get(this.fieldName))
      : null

  clearToken = (): void => Cookie.delete(this.fieldName);

  private mapToken = (token: any): Token => new Token( token.access_token, token.token_type,
    token.refresh_token, token.expires_in, token.scope, token.role, token.userId, token.username, token.avatar )

}
