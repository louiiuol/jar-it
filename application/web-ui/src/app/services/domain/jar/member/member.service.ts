import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JarCreate, JarView, MemberDetails, MemberCreate } from 'src/app/models';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Confess } from 'src/app/models/jar/confession/confess-model';

/**
 * Provides Service to request Member's information over API
 */
@Injectable({ providedIn: 'root' })
export class MemberService {

    private readonly jar_url = `${environment.root_url_secured}jars`;
    private readonly headerJson = environment.config.jsonHeader;

    constructor(private http: HttpClient) { }

    updateMembers = (jarId: number, members: MemberCreate[]): Observable<void> =>
        this.http.post<void>(`${this.jar_url}/${jarId}/members`, members, this.headerJson)

    getMembers = (jarId: number): Observable<MemberDetails[]> =>
        this.http.get<MemberDetails[]>(`${this.jar_url}/${jarId}/members`, this.headerJson)

    mapMembers = (members: MemberDetails[]): MemberCreate[] => {
        const result = [];
        for (const member of members) {
            result.push(new MemberCreate(member.userId, member.admin));
        }
        return result;
    }

}
