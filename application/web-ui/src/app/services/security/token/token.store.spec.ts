import { TestBed } from '@angular/core/testing';
import { TokenStore } from './token.store';
import { tokenMock } from 'src/app/models/utils/mocks';
import { Cookie } from 'ng2-cookies';
import { Token } from 'src/app/models/utils/token/token.model';

describe('TokenStore', () => {

  let service: TokenStore;
  const fieldName = 'eTin_Token';

  beforeEach( () => {
    TestBed.configureTestingModule({
      providers: [TokenStore]
    });
    service = TestBed.inject(TokenStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save token in Cookies', () => {
    Cookie.delete(fieldName);
    service.saveToken(tokenMock);
    const actual: string = Cookie.get(fieldName);
    expect(actual).toBeDefined();
  });

  it('should get Token when logged', () => {
    service.saveToken(tokenMock);
    const actual: Token = service.getToken();
    expect(actual).toBeTruthy();
  });

  it('shouldn\'t get Token when not logged', () => {
    Cookie.delete(fieldName);
    const actual: Token = service.getToken();
    expect(actual).toBeNull();
  });

  it('should remove token from cookies', () => {
    service.clearToken();
    expect(Cookie.get(fieldName)).toBe('');
  });

});
