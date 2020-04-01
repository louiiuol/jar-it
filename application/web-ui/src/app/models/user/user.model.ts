export class User {

    id: number;
    username: string;
    avatar: string;
    email: string;
    roles: [ {authority: string} ];

    constructor(username: string) {
        this.username = username;
    }

}
