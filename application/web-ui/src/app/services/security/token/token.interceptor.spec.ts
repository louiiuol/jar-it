import { TestBed } from '@angular/core/testing';
import { TokenInterceptor } from './token.interceptor';
import { TokenStorageService } from './token-storage.service';
import { LoaderService } from 'src/app/components/shared';

class MockTokenService {
    getToken() { return '{token}'; }
}

describe('Token Interceptor', () => {

    let interceptor: TokenInterceptor;
    let tokenService: TokenStorageService;
    let loaderService: LoaderService;

    beforeEach(async() => {

        TestBed.configureTestingModule({
            providers: [
                {provide: TokenStorageService,
                    useClass: MockTokenService}
            ]
        })
        .compileComponents();
        interceptor = TestBed.inject(TokenInterceptor);
        tokenService = TestBed.inject(TokenStorageService);
        loaderService = TestBed.inject(LoaderService);
    });

    it('should create', () => {
        expect(interceptor).toBeTruthy();
    });

    it('should intercept', () => {
        const req = 
        expect(interceptor).toBeTruthy();
    });

});
