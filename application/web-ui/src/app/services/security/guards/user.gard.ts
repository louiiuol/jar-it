import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Injectable( { providedIn: 'root' } )
export class UserGuard implements CanActivate, OnDestroy {

  private isLoggedIn: boolean;
  private logged$: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.logged$ = this.authService.isLoggedIn$
      .subscribe((logged: boolean) => this.isLoggedIn = logged);
  }

  ngOnDestroy(): void {
    this.logged$.unsubscribe();
  }

  /**Overriding canActivate to restricted routes
   * This method redirect to home page view if user is not logged in,
   * and returns boolean: true if the user is logged in, false otherwise
   */
  canActivate() {
    if ( !this.isLoggedIn ) {
      this.router.navigate(['/']);
    }
    return this.isLoggedIn;
  }

}
