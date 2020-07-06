import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { JarDetails, MemberDetails } from 'src/app/models';
import { JarService } from 'src/app/services/domain/jar/jar.service';
import { MatDialog } from '@angular/material/dialog';
import { JarHelperService } from 'src/app/services/domain/jar/Jar-helper.service';
import { ConfessComponent } from 'src/app/components/shared/confess/confess.component';
import { PayComponent } from './pay/pay.component';

@Component({
    selector: 'app-jar-over',
    templateUrl: './jar-over.component.html',
    styleUrls: ['./jar-over.component.scss']
})
export class JarOverComponent implements OnInit {

    remaining: number;

    @Input() infos: any;
    @Output() private readonly activeEvent = new EventEmitter<string>();

    jar: JarDetails;
    currentUserId: number;

    get today(): Date { return new Date(Date.now()); }
    get confessions(): number { return JarHelperService.getConfessionsCount(this.jar); }
    get leftTopay(): number { return JarHelperService.leftToPay(this.jar.members); }
    get filteredMembers() { return this.jar.members.filter(member => !member.payed && member.balance > 0); }

    constructor(private service: JarService, protected dialog: MatDialog) { }

    ngOnInit(): void {
        this.jar = this.infos.jar;
        this.currentUserId = this.infos.user;
        this.remaining = JarHelperService.remainingDays(this.infos.jar.closingDate);
    }

    pay(): void {
        const dialogRef = this.dialog.open(PayComponent, { data: this.infos, disableClose: true });
        dialogRef.afterClosed().subscribe(() => {
            this.service.pay(this.jar.id).subscribe((success) => console.log('yes', success));
            if (true) {
                this.activeEvent.emit('PAYED');
            }
        });
    }

    isVisible() {
        const currentMember =
            this.jar.members.find(current => current.userId === this.currentUserId);
        return !(currentMember.payed || currentMember.balance === 0);
    }

}
