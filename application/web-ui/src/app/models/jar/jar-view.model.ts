import { AssociationView } from '../association/association-view.model';
import { MemberPreview } from './member/member-preview.model';
import { jarState } from './jar-state.model';

export class JarView {

    id: number;
    title: string;
    description: string;
    author: MemberPreview;
    addressee: AssociationView;
    balance: number;
    referenceCost: number;
    maxAmount: number;
    startDate: Date;
    closingDate: Date;
    membersCount: number;
    ConfessionsCount: number;
    state: jarState;

}
