import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JarService } from './jar.service';
import { JarDetails } from 'src/app/models';

@Injectable()
export class JarResolver implements Resolve<JarDetails> {

    constructor(private service: JarService) {}

    resolve = (route: ActivatedRouteSnapshot): Observable<JarDetails> =>
        this.service.getDetails(route.params.id)

}
