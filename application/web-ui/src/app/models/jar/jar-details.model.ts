import { MemberPreview, MemberDetails, AssociationView } from '..';
import { JarState } from './jar-state.model';

export class JarDetails {

    id: number;
    title: string;
    description: string;
    author: MemberPreview;
    addressee: AssociationView;
    referenceCost: number;
    maxAmount: number;
    startingDate: Date;
    closingDate: Date;
    state: JarState;
    balance: number;
    members: MemberDetails[];

}
