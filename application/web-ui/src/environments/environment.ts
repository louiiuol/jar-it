import { HttpHeaders } from '@angular/common/http';

export const Config = {
  jsonHeader: { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) },
  title: 'eTin: First electronic Swear Tin online !'
};

export const environment = {
  production: false,
  root_url: 'http://localhost:1337/',
  root_url_secured: 'http://localhost:1337/api/secure/',
  config: Config
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
