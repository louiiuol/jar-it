import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

/**
 * Provides Guard to validate access to user logged routes
 */
@Injectable( { providedIn: 'root' } )
export class UserGuard implements CanActivate, OnDestroy {

    private isLoggedIn: boolean;
    private logged$: Subscription;

    constructor(private authService: AuthService, private router: Router) {
        this.logged$ = this.authService.isLoggedIn$.subscribe(logged => this.isLoggedIn = logged);
    }

    /**Overriding canActivate to restricted routes
     * This method redirect to home page view if user is not logged in,
     * and returns boolean: true if the user is logged in, false otherwise
     */
    canActivate() {
        if ( !this.isLoggedIn ) { this.router.navigate(['/']); }
        return this.isLoggedIn;
    }

    ngOnDestroy(): void {
        this.logged$.unsubscribe();
    }


}
