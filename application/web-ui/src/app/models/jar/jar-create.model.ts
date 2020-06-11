import { MemberCreate } from './member/member-create.model';

export class JarCreate {

    title: string;
    description: string;
    maxAmount: number;
    closingDate: Date;
    addressee: number;
    author: number;
    members: MemberCreate[];
    referenceCost: number;

    constructor(title: string, maxAmount: number, closingDate: Date, addressee: number,
                members: MemberCreate[], author: number, referenceCost: number, description?: string) {
        this.title = title;
        this.description = !!description ? description : 'No description provided';
        this.closingDate = closingDate;
        this.maxAmount = maxAmount;
        this.addressee = addressee;
        this.members = members;
        this.author = author;
        this.referenceCost = referenceCost;
    }

}
