import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JarCreate, JarView, JarUpdate, JarDetails } from 'src/app/models';
import { environment } from 'src/environments/environment';
import { Page } from 'src/app/models/utils/page.model';

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
        this.http.get<JarView>(`${this.jar_url}/${id}`, this.headerJson)

    getDetails = (id: number): Observable<JarDetails> =>
        this.http.get<JarDetails>(`${this.jar_url}/${id}/details`, this.headerJson)

    getAllByUser = (id: number, sort: string, order: string, page: number, size: number): Observable<Page<JarView>> =>
        this.http.get<Page<JarView>>(`${this.jar_url}/users/${id}?page=${page}&size=${size}&sort=${sort}&order=${order}`, this.headerJson)

    activate = (id: number): Observable<void> =>
        this.http.get<void>(`${this.jar_url}/${id}/activate`, this.headerJson)

    update = (jar: JarUpdate): Observable<void> =>
        this.http.put<void>(`${this.jar_url}/${jar.id}/settings`, jar, this.headerJson)

    pay = (jarId: number): Observable<void> =>
        this.http.put<void>(`${this.jar_url}/${jarId}/pay`, this.headerJson)

    updateMembers = (jarId: number, members: any): Observable<void> =>
        this.http.put<void>(`${this.jar_url}/${jarId}/settings`, members, this.headerJson)

}
