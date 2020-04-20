import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  /**Overriding canActivate to non-logged routes
   * This method redirect to dashboard view if user is logged in,
   * and returns boolean: true if the user isn't logged in, false otherwise
   */
  canActivate() {
    const logged: boolean = this.authService.isLoggedIn();
    if (logged) {
      this.router.navigate(['dashboard']);
    }
    return !logged;
  }

}
