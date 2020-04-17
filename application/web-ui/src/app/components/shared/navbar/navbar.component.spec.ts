import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/services';
import { MatMenuModule } from '@angular/material/menu';

class MockAuthService {
  logged = false;
  isLoggedIn() { return this.logged; }
  getCurrentUser() { return {
    username: 'tester42',
    avatar: 'unknown'
  }; }
}

describe('NavbarComponent', () => {

  let authService: AuthService;
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [RouterTestingModule, HttpClientModule, MatSnackBarModule, MatMenuModule],
      providers: [{provide: AuthService, useClass: MockAuthService}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

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

  it('should get avatar name when logged in', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    expect(component.avatar).toEqual('unknown');
  });

});
