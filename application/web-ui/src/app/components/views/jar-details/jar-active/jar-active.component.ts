import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JarDetails, Confession, MemberDetails, JarInfo } from 'src/app/models';
import { ConfessComponent } from '../../../shared/confess/confess.component';
import { ConfessionUpdateComponent } from './confession-update/confession-update.component';
import { JarHelperService } from 'src/app/services/domain/jar/Jar-helper.service';
import { TitleShortenerPipe } from 'src/app/services/pipes/title-shortener.pipe';

@Component({
    selector: 'app-jar-active',
    templateUrl: './jar-active.component.html',
    styleUrls: ['./jar-active.component.scss'],
    providers: [ TitleShortenerPipe ]
})
export class JarActiveComponent implements OnInit {

    @Input() infos: JarInfo;
    @Output() private readonly activeEvent = new EventEmitter<string>();

    get confessionsCount(): number { return this.confessionsList.length; }
    get jar(): JarDetails { return this.infos.jar; }
    get currentMember(): MemberDetails { return this.jar.members.find(member => member.userId === this.infos.user); }
    get remainingDays(): number { return JarHelperService.remainingDays(this.infos.jar.closingDate); }
    get sortedMembers(): MemberDetails[] { return JarHelperService.sortMembers(this.jar.members); }

    confessionsList: Confession[];

    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {
        this.confessionsList = JarHelperService.getConfessions(this.jar);
    }

    confess() {
        const dialogRef = this.dialog.open(ConfessComponent, { data: this.infos, disableClose: true });
        dialogRef.afterClosed().subscribe( (confess) => {
            if (confess) {
                if (!this.hasMaxAmountReached()) {
                    this.jar.balance += this.jar.referenceCost;
                    this.currentMember.balance += this.jar.referenceCost;
                    const confessed = new Confession(confess.swear, this.currentMember, new Date(Date.now()));
                    this.confessionsList.push(confessed);
                    JarHelperService.sortConfessions(this.confessionsList);
                }
            }
        });
    }

    ownConfession = (confession: Confession): boolean => confession.author.id === this.currentMember.id;

    updateConfession(confession: Confession): void {
        const jarId = this.jar.id;
        const dialogRef = this.dialog.open(ConfessionUpdateComponent, { data: { confession, jarId }, disableClose: true });
        dialogRef.afterClosed().subscribe((updated) => {
            if (updated) {
                this.confessionsList.find(current => current.swear === confession.swear).swear = updated;
            }
        });
    }

    private hasMaxAmountReached(): boolean {
        if ( (this.jar.balance + this.jar.referenceCost) >= this.jar.maxAmount) {
            this.activeEvent.emit('MAX_AMOUNT_REACHED');
            return true;
        } else {
            return false;
        }
    }

}
