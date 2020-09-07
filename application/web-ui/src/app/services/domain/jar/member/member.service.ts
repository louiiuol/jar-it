import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MemberDetails } from 'src/app/models';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

/**
 * Provides Service to request Member's information over API
 */
@Injectable({ providedIn: 'root' })
export class MemberService {

    private readonly jar_url = `${environment.root_url_secured}jars`;
    private readonly headerJson = environment.config.jsonHeader;

    constructor(private http: HttpClient) { }

    updateMembers = (jarId: number, members: number[]): Observable<void> =>
        this.http.put<void>(`${this.jar_url}/${jarId}/members`, members, this.headerJson)

    getMembers = (jarId: number): Observable<MemberDetails[]> =>
        this.http.get<MemberDetails[]>(`${this.jar_url}/${jarId}/members`, this.headerJson)

}
