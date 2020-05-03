import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import { HomeComponent, DashboardComponent } from './components/views';
import { AppComponent } from './components/app.component';
import { routes } from './app.routing';
import { UserGuard, AnonymousGuard } from './services/security/guards';
import { AuthServiceMockSimple } from './models/utils/mocks';
import { AuthService } from './services/security/auth/auth.service';

describe('App Routing', () => {

  let router: Router;
  let fixture: ComponentFixture<AppComponent>;
  let userGuard: UserGuard;
  let anonymousGuard: AnonymousGuard;
  let authService: AuthService;
  let done = false;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      declarations: [HomeComponent, DashboardComponent, AppComponent],
      providers: [{ provide: AuthService, useClass: AuthServiceMockSimple }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    router = TestBed.inject(Router);
    userGuard = TestBed.inject(UserGuard);
    anonymousGuard = TestBed.inject(AnonymousGuard);
    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(AppComponent);
  });

  afterEach(() => {
    done = false;
  });

  it('should work with fakeAsync', fakeAsync(() => {
    const promise = new Promise(resolve => { setTimeout(resolve, 10); });
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('should redirect from bad url to 404 page', () => {
    fixture.ngZone.run(fakeAsync(() => {
      router.navigate(['unknown-url-to-be-redirected']).then(() => (done = true));
      tick();
      expect(router.url).toBe('/404');
    }));
  });

  it('should access to dashboard when logged in', () => {
    fixture.ngZone.run(fakeAsync(() => {
      spyOn(userGuard, 'canActivate').and.returnValue(true);
      router.navigate(['/dashboard']).then(() => (done = true));
      tick();
      expect(router.url).toBe('/dashboard');
    }));
  });

  it('shouldn\'t access to dashboard when not logged in', () => {
    fixture.ngZone.run(fakeAsync(() => {
      spyOn(userGuard, 'canActivate').and.returnValue(false);
      router.navigate(['/dashboard']).then(() => (done = true));
      tick();
      expect(router.url).toBe('/');
    }));
  });

});
