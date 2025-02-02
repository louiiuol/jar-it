import {TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { routes } from 'src/app/app.routing';
import { AuthServiceMockSimple, loginMock } from 'src/app/models/utils/mocks';
import { UserGuard } from '.';
import { AuthService } from '../auth/auth.service';
import { NgZone } from '@angular/core';

// tslint:disable: no-string-literal
describe('UserGuard', () => {

  let guard: UserGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [{provide: AuthService, useClass: AuthServiceMockSimple}]
    }).compileComponents();
    guard = TestBed.inject(UserGuard);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService);
  }));

  it(' should create', () => {
    expect(guard).toBeTruthy();
  });

  it(' should be able to hit route when user is logged in', () => {
    new NgZone({}).run(fakeAsync(() => {
      authService.logIn(loginMock);
      router.navigate(['/dashboard']).then(() => {
        expect(guard.canActivate()).toBe(true);
        tick();
        expect(router.url).toBe('/dashboard');
      });
    }));
  });

  it(' shouldn\'t be able to hit route when user is not logged in', () => {
    new NgZone({}).run(fakeAsync(() => {
      router.navigate(['/dashboard']).then(() => {
        expect(guard.canActivate()).toBe(false);
        tick();
        expect(router.url).toBe('/');
      });
    }));
  });

  it('should unsubscibe when destroyed', () => {
    guard.ngOnDestroy();
    expect(guard['token$']).toBeUndefined();
  });

});
