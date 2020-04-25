import { TestBed, inject } from '@angular/core/testing';

import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {

  let service: TokenStorageService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [TokenStorageService]
    });
    service = TestBed.inject(TokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
