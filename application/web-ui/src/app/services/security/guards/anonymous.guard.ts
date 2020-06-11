import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

/**
 * Provides Guard to validate access to unlogged routes
 */
@Injectable({ providedIn: 'root' })
export class AnonymousGuard implements CanActivate, OnDestroy {

    private isLoggedIn: boolean;
    private logged$: Subscription;

    constructor(private authService: AuthService, private router: Router) {
        this.logged$ = this.authService.isLoggedIn$.subscribe(logged => this.isLoggedIn = logged);
    }

    ngOnDestroy(): void {
        this.logged$.unsubscribe();
    }

    /** Overriding canActivate to non-logged routes
     * This method redirect to dashboard view if user is logged in,
     * and returns boolean: true if the user isn't logged in, false otherwise
     */
    canActivate() {
        if (this.isLoggedIn) { this.router.navigate(['dashboard']); }
        return !this.isLoggedIn;
    }

}
