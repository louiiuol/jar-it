import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Config } from 'src/environments/environment';
import { Token, IToken } from 'src/app/models';
import { TokenStoreMock, TokenStoreLoggedMock } from 'src/app/models/utils/mocks/token.store.mock.spec';
import { tokenMock, loginMock } from 'src/app/models/utils/mocks';
import { TokenStore } from '../token/token.store';
import { AuthService } from './auth.service';
import { NgZone } from '@angular/core';

describe('AuthService [LOGGED]', () => {

  let tokenStore: TokenStore;
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, {provide: TokenStore, useClass: TokenStoreLoggedMock}],
    });
    service = TestBed.inject(AuthService);
    tokenStore = TestBed.inject(TokenStore);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  it('should be created as LOGGED', () => {
    expect(service).toBeTruthy();
  });

  it('should have current user defined', () => {
    expect(service.currentUser).toBeDefined();
  });

  // it('should login and logout', () => {
  //   service.logIn(loginMock).subscribe();
  //   const req = httpMock.expectOne(Config.uris.token);
  //   req.flush(tokenMock);
  //   expect(req.request.method).toBe('POST');
  //   expect(req.request.responseType).toEqual('json');
  //   service.token$.subscribe(token => expect(token).toBe)
  // });

  // it('should register with success', () => {
  //   const sub = service.signUp(loginMock).subscribe();
  //   const req = httpMock.expectOne(Config.uris.register);
  //   expect(req.request.method).toBe('POST');
  //   sub.unsubscribe();
  //   httpMock.verify();
  // });

  // it('should be unlogged if token is null', () => {
  //   spyOn(tokenStore, 'checkToken').and.returnValue(false);
  //   service.isLoggedOut$.subscribe(unlogged => expect(unlogged).toBe(true));
  // });

  // it('should login successfully', fakeAsync( () => {
  //   const sub = service.logIn(loginMock).subscribe();
  //   spyOn(tokenStore, 'saveToken').withArgs(tokenMock);
  //   const req = httpMock.expectOne(Config.uris.token);
  //   expect(req.request.method).toBe('POST');
  //   expect(req.request.responseType).toEqual('json');
  //   req.flush(tokenMock);
  //   sub.unsubscribe();
  //   httpMock.verify();
  //   tick();
  //   expect(service.currentUser).toBeDefined();
  // }));

  // // fit('should have token as observable', fakeAsync(() => {
  // //   const sub = service.logIn(loginMock).subscribe();
  // //   const spied = spyOn(tokenStore, 'saveToken').withArgs(tokenMock).and.returnValue(tokenMock);
  // //   console.log('YOLOOOOOOOOOOOOOOO')
  // //   // const spied = spyOn(tokenStore, 'getToken').and.returnValue(new Token(tokenMock));
  // //   expect(spied).toHaveBeenCalledTimes(1);
  // //   tick();
  // //   expect(service.currentUser).toBeTruthy();
  // //   sub.unsubscribe();

  // // }));

  // it('shouldn\'t update current subject if no token found', () => {
  //   (tokenStore as any).token = null;
  //   spyOn(tokenStore, 'checkToken').and.returnValue(false);
  //   const spied = spyOn(tokenStore, 'getToken').and.returnValue(null);
  //   expect(spied).toHaveBeenCalledTimes(0);
  //   service.token$.subscribe(token => expect(token).toBeNull());
  // });

});
