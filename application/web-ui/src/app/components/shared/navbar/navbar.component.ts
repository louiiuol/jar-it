import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/security/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(protected router: Router, protected authService: AuthService) {}

  get username() { if (this.isLoggedIn()) { return this.authService.getCurrentUser().username; } }
  get avatar() { if (this.isLoggedIn()) { return this.authService.getCurrentUser().avatar; } }

  isLoggedIn(): boolean { return this.authService.isLoggedIn(); }

  showDashboard(): void { this.router.navigate(['/dashboard']); }

  showProfile(): void { alert('feature coming soon'); }

  logout = (): void => this.authService.logout();

}
