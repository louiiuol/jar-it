import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormFactory } from 'src/app/services/forms/form.factory';
import { AuthService } from 'src/app/services/security/auth/auth.service';
import { AuthServiceMockSimple, registerMock, tokenMock } from 'src/app/models/utils/mocks';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('RegisterComponent', () => {

  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let formService: FormFactory;
  let location: Location;
  let httpMock: HttpTestingController;
  let router: Router;
  let snackBar: MatSnackBar;

  beforeEach( (() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule, BrowserAnimationsModule],
      providers: [FormFactory, FormBuilder, AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    formService = TestBed.inject(FormFactory);
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    snackBar = TestBed.inject(MatSnackBar);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.ngZone.run(() => router.initialNavigation());
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store username as variable', () => {
    (component.registerForm.get('username') as any).value = registerMock.username;
    expect(component.username.value).toBe(registerMock.username);
  });

  it('should store username as variable', () => {
    (component.registerForm.get('agree') as any).value = true;
    expect(component.agree.value).toBeTrue();
  });

  it('should store username as variable', () => {
    (component.registerForm.get('email') as any).value = registerMock.email;
    expect(component.email.value).toBe(registerMock.email);
  });

  it('should store username as variable', () => {
    (component.passwordForm.get('password') as any).value = registerMock.password;
    expect(component.password.value).toBe(registerMock.password);
  });

  it('should toggle form to login', () => {
    (component.registerForm.get('username') as any).value = registerMock.username;
    component.toggleForm();
    expect(component.registerForm.get('username').touched).toBeFalse();
  });

  it('should register', () => {
    (component.registerForm.get('username') as any).value = registerMock.username;
    (component.registerForm.get('email')as any).value = registerMock.email;
    (component.passwordForm.get('password') as any).value = registerMock.password;
    component.register();
    const req = httpMock.expectOne(environment.root_url + 'api/auth/signup');
    req.flush(tokenMock);
    expect(location.path()).toEqual(''); // To Fix
  });

});
