import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/security/auth/auth.service';
import { User } from 'src/app/models';

@Component({
  selector: 'app-dashboard',
  template: `welcome {{user.username}}`
})
export class DashboardComponent {

  constructor(protected authService: AuthService) { }

  get user(): User { return this.authService.getCurrentUser(); }

}
