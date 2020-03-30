import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Config } from 'src/ressources/config';
import { User } from 'src/app/models';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) {}

  getAllUser = (): Observable<User[]> => this.http.get<any>(Config.uris.user, Config.httpOptions.json);

  get = (id: number): Observable<User> => this.http.get<any>(Config.uris.user + '/' + id, Config.httpOptions.json);



  

}
