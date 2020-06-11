import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JarCreate, JarView, JarUpdate, JarDetails } from 'src/app/models';
import { environment } from 'src/environments/environment';

/**
 * Provides Service to request Jar's information over API
 */
@Injectable({ providedIn: 'root' })
export class JarService {

    private readonly jar_url = `${environment.root_url_secured}jars`;
    private readonly headerJson = environment.config.jsonHeader;

    constructor(private http: HttpClient) { }

    create = (jar: JarCreate): Observable<number> =>
        this.http.post<number>(this.jar_url, jar, this.headerJson)

    get = (id: number): Observable<JarView> =>
        this.http.get<JarDetails>(`${this.jar_url}/${id}`, this.headerJson)

    getDetails = (id: number): Observable<JarDetails> =>
        this.http.get<JarDetails>(`${this.jar_url}/${id}/details`, this.headerJson)

    getAllByUser = (id: number): Observable<JarView[]> =>
        this.http.get<JarView[]>(`${this.jar_url}/users/${id}`, this.headerJson)

    activate = (id: number): Observable<void> =>
        this.http.get<void>(`${this.jar_url}/${id}/activate`, this.headerJson)

    update = (jar: JarUpdate): Observable<void> =>
        this.http.put<void>(`${this.jar_url}/${jar.id}/settings`, jar, this.headerJson)

    updateMembers = (jarId: number, members: any): Observable<void> =>
        this.http.put<void>(`${this.jar_url}/${jarId}/settings`, members, this.headerJson)

    remainingDays = (closingDate: Date): number => {
        const now = new Date(Date.now()).getTime(); // get today date for jar in millisecond
        const end = new Date(closingDate).getTime(); // get Max date for jar in millisecond
        const diffTime = Math.abs(end - now) / (1000 * 60 * 60 * 24); // get milliseconds diff and transform as days
        return Math.ceil(diffTime); // remove useless decimals
    }

    countJarConfessions(jar: JarDetails): number {
        let sum = 0;
        jar.members.forEach(current => sum += current.confessions.length);
        return sum;
    }

}
