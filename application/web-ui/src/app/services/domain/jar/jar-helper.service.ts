import { Injectable } from '@angular/core';
import { JarDetails, Confession, JarView, MemberDetails } from 'src/app/models';
import { JarState } from 'src/app/models/jar/jar-state.model';

@Injectable({ providedIn: 'root' })
export class JarHelperService {

    static remainingDays = (closingDate: Date): number => {
        const now = new Date(Date.now()).getTime(); // get today date for jar in millisecond
        const end = new Date(closingDate).getTime(); // get Max date for jar in millisecond
        const diffTime = Math.abs(end - now) / (1000 * 60 * 60 * 24); // get milliseconds diff and transform as days
        return Math.ceil(diffTime); // remove useless decimals
    }

    static getConfessions(jar: JarDetails): Confession[] {
        const confessions: Confession[] = [];
        for (const member of jar.members) {
            for (const confession of member.confessions) {
                confession.author = member;
                confessions.push(confession);
            }
        }
        confessions.sort((current: Confession, next: Confession) => next.id - current.id);
        return confessions;
    }

    static leftToPay(jarMembers: MemberDetails[]): number {
        return jarMembers.filter(current => current.payed === false) // Only members who haven't payed yet
            .reduce((total, current) => total + current.balance, 0); // Total of their balance only
    }

    static getConfessionsCount = (jar: JarDetails) => jar.members.reduce( (total, current) => total + current.confessions.length, 0);

}
