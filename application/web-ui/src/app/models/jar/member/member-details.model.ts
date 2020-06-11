import { MemberPreview } from './member-preview.model';
import { Confession } from '../confession/confession.model';

export class MemberDetails extends MemberPreview {

    balance: number;
    joined: Date;
    admin: boolean;
    payed: boolean;
    confessions: Confession[];

    constructor(userId: number, username: string, avatar: string, admin: boolean) {
        super();
        this.userId = userId;
        this.username = username;
        this.avatar = avatar;
        this.admin = admin;
    }

}
