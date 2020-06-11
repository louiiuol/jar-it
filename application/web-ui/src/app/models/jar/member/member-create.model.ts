export class MemberCreate {

    user: { id: number } = { id: null };
    admin: boolean;

    constructor(userId: number, admin: boolean) {
        this.user.id = userId;
        this.admin = admin;
    }

}
