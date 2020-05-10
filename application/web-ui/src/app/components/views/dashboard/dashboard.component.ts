import { Component } from '@angular/core';
import { AuthInfo } from 'src/app/models';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  get currentUser(): AuthInfo { return this.authService.currentUser; }

  constructor(private authService: AuthService) { }

}
