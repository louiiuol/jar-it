import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/security/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router, private service: AuthService) {}

  get username() {
    if (this.isLoggedIn()) {
    return this.service.getCurrentUser().username;
    }
  }

  get avatar() {
    if (this.isLoggedIn()) {
      return this.service.getCurrentUser().avatar;
    }
  }

  isLoggedIn(): boolean { return this.service.isLoggedIn(); }

  logout(): void { this.service.logOut(); }

  showDashboard(): void { this.router.navigate(['/dashboard']); }

  showProfile(): void { this.router.navigate(['/profile']); }

}
