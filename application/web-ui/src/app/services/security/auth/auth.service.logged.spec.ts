import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TokenStoreLoggedMock } from 'src/app/models/utils/mocks/token.store.mock.spec';
import { TokenStore } from '../token/token.store';
import { AuthService } from './auth.service';

describe('AuthService [LOGGED]', () => {

  let tokenStore: TokenStore;
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService, {provide: TokenStore, useClass: TokenStoreLoggedMock}],
    });
    service = TestBed.inject(AuthService);
    tokenStore = TestBed.inject(TokenStore);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  }));

  it('should be created as LOGGED', () => {
    expect(service).toBeTruthy();
  });

  it('should have current user defined', () => {
    expect(service.currentUser).toBeDefined();
  });

});
