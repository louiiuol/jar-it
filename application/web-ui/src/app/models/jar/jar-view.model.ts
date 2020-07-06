import { MemberPreview, AssociationView } from './..';
import { JarState } from './jar-state.model';
import { JarExtras } from './jar-extras.model';

export class JarView {

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
    additionalInfos: JarExtras;

}
