import { Component } from '@angular/core';
import { User } from 'src/app/models';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(protected authService: AuthService) { }

  get user(): User { return this.authService.getCurrentUser(); }

}
