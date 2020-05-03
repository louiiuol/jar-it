import { Token, IToken } from '../token.model';
import { tokenMock } from './token.mock';

export class TokenStoreMock { // Mock to reproduce TokenStore behaviour in Tests
  token: Token;
  getToken() { return this.token; }
  saveToken(input: IToken): Token { return new Token(input); }
  clearToken() { this.token = null; }
  checkToken() { return !!this.token; }
}

export class TokenStoreLoggedMock { // Mock to reproduce TokenStore behaviour in Tests
  token = new Token(tokenMock);
  getToken() { return this.token; }
  saveToken(input: IToken): Token { this.token = new Token(input); return this.token; }
  clearToken() { this.token = null; }
  checkToken() { return true; }
}
