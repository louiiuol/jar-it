import {TestBed, async} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import { UserGuard } from './user.gard';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../../domain/user/user.service';

class MockAuthService {
    isLoggedIn() { return false; }
}

describe('Logged in guard should', () => {
    let loggedInGuard: UserGuard;
    let authService: AuthService;
    const router = {
        navigate: jasmine.createSpy('navigate')
    };

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, CommonModule],
            providers: [UserGuard, {provide: UserService, useClass: MockAuthService},
                {provide: Router, useValue: router}
            ]
        })
            .compileComponents(); // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
        loggedInGuard = TestBed.inject(UserGuard);
        authService = TestBed.inject(AuthService);
    });

    it('be able to hit route when user is logged in', () => {
        spyOn(authService, 'isLoggedIn').and.returnValue(true);
        expect(loggedInGuard.canActivate()).toBe(true);
    });

    it('not be able to hit route when user is not logged in', () => {
        spyOn(authService, 'isLoggedIn').and.returnValue(false);
        expect(loggedInGuard.canActivate()).toBe(false);
    });
});