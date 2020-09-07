import { MemberPreview } from './member-preview.model';
import { Confession } from '../confession/confession.model';

export class MemberDetails extends MemberPreview {

    balance: number;
    joined: Date;
    payed: boolean;
    confessions: Confession[];

    constructor(userId: number, username: string, avatar: string, admin: boolean) {
        super(userId, username, avatar, admin);
    }

}
