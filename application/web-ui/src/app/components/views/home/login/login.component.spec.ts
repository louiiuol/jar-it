import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormFactory } from 'src/app/services/forms/form.factory';
import { AuthService } from 'src/app/services/security/auth/auth.service';
import { loginMock, tokenMock } from 'src/app/models/utils/mocks';
import { LoginComponent } from './login.component';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let formService: FormFactory;
  let location: Location;
  let httpMock: HttpTestingController;
  let router: Router;
  let snackBar: MatSnackBar;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule, MatDialogModule],
      providers: [FormFactory, FormBuilder, AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    formService = TestBed.inject(FormFactory);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    snackBar = TestBed.inject(MatSnackBar);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.ngZone.run(() => router.initialNavigation());
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store username as variable', () => {
    (component.loginForm.get('username') as any).value = 'louiiuol';
    expect(component.username.value).toBe('louiiuol');
  });

  it('should store username as variable', () => {
    const pass = 'Password';
    (component.loginForm.get('password') as any).value = pass;
    expect(component.password.value).toBe(pass);
  });

  it('should toggle form to register', () => {
    (component.loginForm.get('username') as any).value = 'louiiuol';
    component.toggleForm();
    expect(component.loginForm.get('username').touched).toBeFalse();
  });

  it('should login', () => {
    (component.loginForm.get('username') as any).value = loginMock.username;
    (component.loginForm.get('password')as any).value = loginMock.password;
    component.login();
    const req = httpMock.expectOne(environment.root_url + 'oauth/token');
    req.flush(tokenMock);
    expect(location.path()).toEqual('/'); // To Fix
  });

  it('should\'nt login', () => {
    (component.loginForm.get('username') as any).value = 'BadCredentials';
    (component.loginForm.get('password')as any).value = loginMock.password;
    component.login();
    const req = httpMock.expectOne(environment.root_url + 'oauth/token');
    req.flush(null, {headers: {} });
    expect(location.path()).toEqual(''); // To Fix
  });

});
