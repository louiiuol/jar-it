import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserService', () => {

  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
