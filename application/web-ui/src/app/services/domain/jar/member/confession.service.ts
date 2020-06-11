import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Confession } from 'src/app/models';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Confess } from 'src/app/models/jar/confession/confess-model';

@Injectable({ providedIn: 'root' })
export class ConfessionService {

    private readonly jar_url = environment.root_url_secured + 'jars';
    private readonly headerJson = environment.config.jsonHeader;

    constructor(private http: HttpClient) { }

    confess = (swear: Confess, jar: number): Observable<void> =>
        this.http.post<void>(this.jar_url + '/' + jar + '/confess', swear, this.headerJson)

    getJarConfessions = (jar: number): Observable<Confession[]> =>
        this.http.get<Confession[]>(this.jar_url + '/' + jar + '/confessions', this.headerJson)

}
