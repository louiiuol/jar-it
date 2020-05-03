import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { TokenStoreMock } from 'src/app/models/utils/mocks/token.store.mock.spec';
import { TokenStore } from '../token/token.store';
import { AuthService } from './auth.service';
import { loginMock, tokenMock } from 'src/app/models/utils/mocks';
import { Config, environment } from 'src/environments/environment';
import { Token } from 'src/app/models';

// tslint:disable: no-string-literal
describe('AuthService [UNLOGGED]', () => {

  let tokenStore: TokenStore;
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, {provide: TokenStore, useClass: TokenStoreMock}],
    });
    service = TestBed.inject(AuthService);
    tokenStore = TestBed.inject(TokenStore);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  it('should be created as UNLOGGED', () => {
    expect(service).toBeTruthy();
  });

  it('shouldn\'t update current subject if no token found', () => {
    const spied = spyOn(tokenStore, 'getToken');
    expect(spied).toHaveBeenCalledTimes(0);
    service.token$.subscribe(token => expect(token).toBeNull());
  });

  it('should be unlogged if token is null', () => {
    spyOn(tokenStore, 'checkToken').and.returnValue(false);
    service.isLoggedOut$.subscribe(unlogged => expect(unlogged).toBe(true));
  });

  it('should generate formUrlEncoded', () => {
    const actual = service['generateUrlFormEncoded'](loginMock);
    expect(actual).toBeDefined();
  });

  it('should update subject with token', () => {
    service['updateSubject'](tokenMock);
    expect(service['current'].value).toBeDefined();
  });

  it('should authenticate and retrieve token', () => {
    let actual: Token;
    service['authenticate'](loginMock).subscribe(
      token => actual = new Token(token)
    );
    const req = httpMock.expectOne(environment.root_url + 'oauth/token');
    req.flush(tokenMock);
    expect(actual).toBeDefined();
  });

});
