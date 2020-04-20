import {Location} from '@angular/common';
import {TestBed, fakeAsync, tick, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import { HomeComponent } from './components/views';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { AppComponent } from './components/app.component';
import { routes } from './app-routing.module';
import { UserGuard, AuthGuard } from './services/security/guards';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('App Routing', () => {

    let location: Location;
    let router: Router;
    let fixture: ComponentFixture<AppComponent>;
    let userGuard: UserGuard;
    let authGuard: AuthGuard;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule, MatSnackBarModule],
            declarations: [
            HomeComponent,
            DashboardComponent,
            AppComponent
        ]
        });
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        userGuard = TestBed.inject(UserGuard);
        authGuard = TestBed.inject(AuthGuard);

        fixture = TestBed.createComponent(AppComponent);
        router.initialNavigation();
    });

    it('should work with fakeAsync', fakeAsync(() => {
        const promise = new Promise(resolve => {
            setTimeout(resolve, 10);
        });
        let done = false;
        promise.then(() => (done = true));
        tick(50);
        expect(done).toBeTruthy();
    }));

    it('should redirect from "" redirects you to home page', fakeAsync(() => {
        router.navigate(['']).then(() => {
            tick();
            expect(location.path()).toBe('/welcome');
        });
    }));

    it('should redirect from bad url to 404 page', fakeAsync(() => {
        router.navigate(['unknown-url-to-be-redirected']).then(() => {
            tick();
            expect(location.path()).toBe('/404');
        });
    }));

    it('should access to dashboard when logged in', fakeAsync(() => {
        spyOn(userGuard, 'canActivate').and.returnValue(true);
        router.navigate(['/dashboard']).then(() => {
            tick();
            expect(location.path()).toBe('/dashboard');
        });
    }));

    it('shouldn\'t access to dashboard when not logged in', fakeAsync(() => {
        spyOn(userGuard, 'canActivate').and.returnValue(false);
        router.navigate(['/dashboard']).then(() => {
            tick();
            expect(location.path()).toBe('/');
        });
    }));

});
