import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  /**Overriding canActivate to non-logged routes
   * This method redirect to dashboard view if user is logged in,
   * and returns boolean: true if he isn't logged in, false otherwise
   */
  canActivate() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
    return !this.authService.isLoggedIn();
  }

}
