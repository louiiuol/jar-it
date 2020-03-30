import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/security/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private authService: AuthService, protected router: Router) {}

  get username() { if (this.isLoggedIn()) { return this.authService.getCurrentUser().username; } }
  get avatar() { if (this.isLoggedIn()) { return this.authService.getCurrentUser().avatar; } }

  protected isLoggedIn(): boolean { return this.authService.isLoggedIn(); }

  protected showDashboard(): void { this.router.navigate(['/dashboard']); }

  protected showProfile(): void { alert('feature coming soon'); }

  protected logout = (): void => this.authService.logout();

}
