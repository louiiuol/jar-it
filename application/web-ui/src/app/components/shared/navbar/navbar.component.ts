import { Component } from '@angular/core';
import { AuthInfo } from 'src/app/models';
import { AuthService } from 'src/app/services/security/auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    private current: AuthInfo;

    get user() { return this.current; }
    get isAdmin(): boolean { return this.auth.isAdmin(); }

    constructor(private auth: AuthService) {
        this.auth.token$.subscribe(token => this.current = !!token ? new AuthInfo(token) : null);
    }

    logout = (): Promise<boolean> => this.auth.logOut();

}
