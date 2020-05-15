import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AssociationView, AssociationCreate } from 'src/app/models';
import { AssociationPage } from 'src/app/models/association/association-page.model';

/**
 * Provides Service to request Association's information over API
 */
@Injectable({ providedIn: 'root' })
export class AssociationService {

    private readonly association_url = environment.root_url_secured + 'associations';
    private readonly headerJson = environment.config.jsonHeader;

    constructor(private http: HttpClient) { }

    get = (id: number): Observable<AssociationView> =>
        this.http.get<AssociationView>(`${this.association_url}/${id}`, this.headerJson);

    getAll = (sort: string, order: string, page: number, size: number): Observable<AssociationPage> =>
        this.http.get<AssociationPage>(`${this.association_url}?page=${page}&size=${size}&sort=${sort}&order=${order}`, this.headerJson)

    create = (data: AssociationCreate): Observable<number> =>
        this.http.post<number>(this.association_url, data, this.headerJson)

    delete = (id: number): Observable<void> =>
        this.http.delete<void>(`${this.association_url}/${id}`, this.headerJson)

}
