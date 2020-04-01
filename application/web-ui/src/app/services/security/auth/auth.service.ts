import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Config } from '../../../../resources/config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthLogin } from '../../../models/user/login.model';
import { TokenStorageService } from '../token/token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(protected router: Router, private http: HttpClient, private snackBar: MatSnackBar, private tokenStore: TokenStorageService) {}

  signUp = (info: any): Observable<string> => this.http.post<string>(Config.uris.register, info, Config.httpOptions.json);

  logIn(data: AuthLogin): void {
    this.createPasswordGrant(data).subscribe(
      token => {
        this.tokenStore.saveToken(token);
        this.router.navigate(['/dashboard']);
        this.snackBar.open('Welcome Back ' + data.username, 'close', { duration: 3000 } );
      }, error => {
        const err = error.error.error;
        if (!!err) {
          if (err === 'unauthorized' || err === 'invalid_grant' ) {
            this.snackBar.open('These credentials doesn\'t seems right ... \r\n please check them again ! ', '', { duration: 3000 } );
          }
        } else {
          this.snackBar.open('Seems like server is down, try again later 👻 ', '', { duration: 3000 } );
        }
      }
    );
  }

  logout = (): void => {
    this.tokenStore.clearToken();
    this.router.navigate(['/welcome']);
  }

  isLoggedIn = (): boolean => this.tokenStore.checkToken();

  getCurrentUser = (): any => {
    const token = this.tokenStore.getToken();
    return {
      id: token.userId,
      username: token.username,
      avatar: token.avatar,
      role: token.role
    };
  }

  refreshToken = () => {
    const refreshToken = this.tokenStore.getToken().refreshToken;
    const header = Config.grantType.refresh + Config.clientId + '&refresh_token=' + refreshToken;
    let token;
    this.http.post(Config.uris.token, header, Config.httpOptions.formUrlEncoded).subscribe(
        (data) => {
          console.log(data);
          token = data;
        },
        (err) => {
          console.log(err);
        }
    );
    return token;
  }

  private createPasswordGrant = (data: AuthLogin): Observable<any> => {
    const header = Config.grantType.password + '&username=' + data.username + '&password=' + data.password + Config.clientId;
    return this.http.post<any>(Config.uris.token, header, Config.httpOptions.formUrlEncoded);
  }

}
