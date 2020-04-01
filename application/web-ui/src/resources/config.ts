import { HttpHeaders } from '@angular/common/http';

const url = 'http://localhost:1337/';

export const Config = {

    uris: {
        root: url,
        register:  url + 'api/auth/signup',
        token: url + 'oauth/token',
        association: url + 'api/secure/associations',
        tinee: url + 'api/secure/tinees',
        user: url + 'api/secure/users'
    },
    httpOptions: {
        json: { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) },
        formUrlEncoded: { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) },
        headerToken: 'Authorization'
    },
    token: {
        cookieFieldName: 'eTin_Token',
        type: 'bearer',
        header: 'Authorization'
    },
    grantType: {
        password: 'grant_type=password',
        refresh: 'grant_type=refresh_token'
    },
    cookies: {
        cookieFieldName: 'eTin_User',
    },
    clientId: '&client_id=eTin-web-app',
    title: 'eTin: First electronic Swear Tin online !',
    crlf: '\r\n'

};