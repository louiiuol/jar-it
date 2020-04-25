import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services';
import { MatMenuModule } from '@angular/material/menu';
import { routes } from 'src/app/app-routing.module';

class MockAuthService {
  logged = false;
  isLoggedIn() { return this.logged; }
  getCurrentUser() { return {
    username: 'tester42',
    avatar: 'unknown'
  }; }
  logOut(){}
}

describe('NavbarComponent', () => {

  let authService: AuthService;
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [RouterTestingModule.withRoutes(routes), HttpClientModule, MatSnackBarModule, MatMenuModule],
      providers: [{provide: AuthService, useClass: MockAuthService}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be logged in when init', () => {
    expect(component.isLoggedIn()).toBeFalsy();
  });

  it('should get username when logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    expect(component.username).toEqual('tester42');
  });

  it('shouldn\'t get username when not logged', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    expect(component.username).toEqual(undefined);
  });

  it('should get avatar name when logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    expect(component.avatar).toEqual('unknown');
  });

  it('shouldn\'t get avatar when not logged', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    expect(component.avatar).toEqual(undefined);
  });

  it('should redirect to dashboard when logged in', fakeAsync( () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    component.showDashboard();
    tick();
    expect(router.url).toBe('/dashboard');
  }));

  it('shouldn\'t redirect to dashboard when not logged', fakeAsync( () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    component.showDashboard();
    tick();
    expect(router.url).toBe('/welcome');
  }));

  it('should redirect to profile when logged in', fakeAsync( () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    component.showProfile();
    tick();
    // expect(router.url).toBe('/profile'); => To uncomment when user profile component is created
  }));

  it('shouldn\'t redirect to dashboard when not logged', fakeAsync( () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(false);
    component.showProfile();
    tick();
    // expect(router.url).toBe('/welcome'); => To uncomment when user profile component is created
  }));

  it('should log out', () => {
    const spy = spyOn(authService, 'logOut').and.returnValue();
    component.logout();
    expect(spy).toHaveBeenCalledTimes(1);
  });

});
