import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthInfo } from 'src/app/models';
import { AuthService } from 'src/app/services/security/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  currentUser: AuthInfo;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }

}
