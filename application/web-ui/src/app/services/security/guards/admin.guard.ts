
import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

/**
 * Provides Guard to validate access to admin logged routes
 */
@Injectable( { providedIn: 'root' } )
export class AdminGuard implements CanActivate, OnDestroy {

    private isLoggedIn: boolean;
    private isAdmin: boolean;
    private logged$: Subscription;

    constructor(private auth: AuthService, private router: Router) {
        this.logged$ = this.auth.isLoggedIn$.subscribe(token => this.isLoggedIn = token);
        this.isAdmin = this.auth.isAdmin();
    }

    ngOnDestroy(): void {
        this.logged$.unsubscribe();
    }

    /**Overriding canActivate to restricted routes
     * This method redirect to home page view if user is not logged in,
     * and returns boolean: true if the user is logged in, false otherwise
     */
    canActivate() {
        if (!this.isLoggedIn) {
            this.router.navigate(['/']);
            return false;
        }
        if (!this.isAdmin) {
            this.router.navigate(['/dashboard']);
        }
        return this.isAdmin;
    }

}
