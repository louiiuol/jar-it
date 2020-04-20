import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable( { providedIn: 'root' } )
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  /**Overriding canActivate to restricted routes
   * This method redirect to home page view if user is not logged in,
   * and returns boolean: true if the user is logged in, false otherwise
   */
  canActivate() {
    const logged: boolean = this.authService.isLoggedIn();
    if ( !logged ) {
      this.router.navigate(['/welcome']);
    }
    return logged;
  }

}
