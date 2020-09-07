export class MemberPreview {

    id: number;
    userId: number;
    avatar: string;
    username: string;
    admin: boolean;

    constructor(id: number, username: string, avatar: string, admin: boolean) {
        this.userId = id;
        this.username = username;
        this.avatar = avatar;
        this.admin = admin;
    }

}
