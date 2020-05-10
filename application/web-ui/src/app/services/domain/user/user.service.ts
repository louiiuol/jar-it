import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserView, IUserView, UserUpdate } from 'src/app/models';

/**
 * Provides Service to request User's information over API
 */
@Injectable({ providedIn: 'root' })
export class UserService {

  private readonly users_url = environment.root_url_secured + 'users';
  private readonly headerJson = environment.config.jsonHeader;

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers = (): Observable<UserView[]> => this.http.get<IUserView[]>(this.users_url, this.headerJson);

  get = (id: number): Observable<UserView> => this.http.get<IUserView>(` ${this.users_url}/${id}`, this.headerJson);

  close = (id: number): Observable<void> => this.http.delete<void>(` ${this.users_url}/${id}`, this.headerJson);

  update = (update: UserUpdate, id: number): Observable<void> => this.http.put<void>(` ${this.users_url}/${id}`, update, this.headerJson);

}
