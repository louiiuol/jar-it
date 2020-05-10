
import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthInfo } from 'src/app/models/utils/token/auth-info.model';

/**
 * Provides Guard to validate access to admin logged routes
 */
@Injectable( { providedIn: 'root' } )
export class AdminGuard implements CanActivate, OnDestroy {

  private currentUser: AuthInfo;
  private logged$: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.logged$ = this.authService.token$.subscribe(token => this.currentUser = new AuthInfo(token));
  }

  ngOnDestroy(): void {
    this.logged$.unsubscribe();
  }

  /**Overriding canActivate to restricted routes
   * This method redirect to home page view if user is not logged in,
   * and returns boolean: true if the user is logged in, false otherwise
   */
  canActivate() {
    console.log(this.currentUser)
    if (!this.currentUser) {
      this.router.navigate(['/']);
      return false;
    }
    const isAdmin: boolean = !this.currentUser.roles.includes({ authority: 'ADMIN' });
    if (isAdmin) { this.router.navigate(['/dashboard']); }
    return isAdmin;
  }

}
