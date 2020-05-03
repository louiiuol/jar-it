import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserView, IUserView } from 'src/app/models';

@Injectable({ providedIn: 'root' })
export class UserService {

  private readonly users_url =  environment.root_url_secured + 'users';

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers = (): Observable<UserView[]> => this.http.get<IUserView[]>(this.users_url, environment.config.jsonHeader);

  get = (id: number): Observable<UserView> => this.http.get<IUserView>(this.users_url + '/' + id, environment.config.jsonHeader);

}
