import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { TokenStore } from './token.store';
import { tokenMock } from 'src/app/models/utils/mocks';
import { UserService } from '../../domain/user/user.service';
import { LoaderService } from '../../loader';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app.routing';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

// tslint:disable-next-line: no-string-literal
describe('Token Interceptor', () => {

  let interceptor: TokenInterceptor;
  let userService: UserService;
  let tokenStore: TokenStore;
  let loaderService: LoaderService;
  let httpMock: HttpTestingController;
  let router: Router;

  let response: any;
  let errResponse: any;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      providers: [
        UserService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
      ]
    }).compileComponents();
    interceptor = TestBed.inject(TokenInterceptor);
    tokenStore = TestBed.inject(TokenStore);
    userService = TestBed.inject(UserService);
    loaderService = TestBed.inject(LoaderService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  }));

  it('should create', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add authorization header', () => {
    spyOn(tokenStore, 'checkToken').and.returnValue(true);
    spyOn(tokenStore, 'getToken').and.returnValue(tokenMock);
    userService.get(1).subscribe(res => response = res, err => errResponse = err);
    const httpRequest = httpMock.expectOne(environment.root_url_secured + 'users/1');
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe('bearer' + tokenMock.access_token);
  });

  it('shouldn\'t add invalid token', () => {
    spyOn(tokenStore, 'getToken').and.returnValue(null);
    const spied = spyOn(interceptor, 'addHeader');
    userService.getAllUsers().subscribe(res => response = res, err => errResponse = err);
    expect(spied).toHaveBeenCalledTimes(0);
  });

  it('shouldn\'t search for token if not logged', () => {
    spyOn(tokenStore, 'checkToken').and.returnValue(false);
    const spied = spyOn(tokenStore, 'getToken');
    userService.get(1).subscribe(res => response = res, err => errResponse = err);
    expect(spied).toHaveBeenCalledTimes(0);
  });

});
