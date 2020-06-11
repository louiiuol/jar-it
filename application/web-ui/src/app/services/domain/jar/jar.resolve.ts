import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JarService } from './jar.service';
import { JarView } from 'src/app/models';

@Injectable()
export class JarResolver implements Resolve<JarView> {

    constructor(private service: JarService) {}

    resolve = (route: ActivatedRouteSnapshot): Observable<JarView> =>
        this.service.getDetails(route.params.id)

}
