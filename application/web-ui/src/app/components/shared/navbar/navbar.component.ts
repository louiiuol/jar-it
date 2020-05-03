import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models';
import { AuthService } from 'src/app/services/security/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  user: Token;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isLoggedIn$;
    this.auth.token$.subscribe(user => this.user = user);
  }

  logout = (): Promise<boolean> => this.auth.logOut();

  showDashboard = (): Promise<boolean> => this.router.navigate(['/dashboard']);

  showProfile = (): Promise<boolean> => this.router.navigate(['/profile']);

}
