import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable( { providedIn: 'root' } )
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/welcome']);
    }
    return this.authService.isLoggedIn();
  }

}
