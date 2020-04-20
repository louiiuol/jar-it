import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TokenStorageService } from '../token/token-storage.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Config } from 'src/resources/config';

describe('AuthService', () => {

  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenStorageService],
      imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register with success', () => {
    const data = { username: 'tester42', password: 'Password1', email: 'testingemail@mail.com' };
    service.signUp(data).subscribe();
    const req = httpMock.expectOne(`${Config.uris.register}`, 'yolo');
    expect(req.request.method).toBe('POST');
    req.flush(data);
    // TODO add success assertion
  });
});
