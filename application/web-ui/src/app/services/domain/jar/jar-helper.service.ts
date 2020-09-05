import { Injectable } from '@angular/core';
import { JarDetails, Confession, MemberDetails } from 'src/app/models';

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
                confession.author.id = member.id;
                confession.author.username = member.username;
                confession.author.avatar = member.avatar;
                confessions.push(confession);
            }
        }
        this.sortConfessions(confessions);
        return confessions;
    }

    static sortConfessions(confessions: Confession[]): void {
        confessions.sort((current: Confession, next: Confession) => {
            const nextDate = new Date(next.date.toString()).getTime();
            const actualDate = new Date(current.date.toString()).getTime();
            return nextDate - actualDate;
        });
    }

    static leftToPay(jarMembers: MemberDetails[]): number {
        return jarMembers.filter(current => current.payed === false) // Only members who haven't payed yet
            .reduce((total, current) => total + current.balance, 0); // Total of their balance only
    }

    static getConfessionsCount = (jar: JarDetails) => jar.members.reduce((total, current) => total + current.confessions.length, 0);

    static sortMembers(members: MemberDetails[]): MemberDetails[] {
        return members.sort((current, next) => current.username.toLowerCase().localeCompare(next.username.toLowerCase()));
    }

}
