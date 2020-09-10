import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { JarDetails, MemberDetails } from 'src/app/models';
import { JarService } from 'src/app/services/domain/jar/jar.service';
import { MatDialog } from '@angular/material/dialog';
import { JarHelperService } from 'src/app/services/domain/jar/Jar-helper.service';
import { PayComponent } from './pay/pay.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    currentUserBalance: number;
    currentMember: MemberDetails;

    get today(): Date { return new Date(Date.now()); }
    get confessions(): number { return JarHelperService.getConfessionsCount(this.jar); }
    get leftTopay(): number { return JarHelperService.leftToPay(this.jar.members); }
    get filteredMembers(): MemberDetails[] { return this.jar.members.filter(member => !member.payed && member.balance >= 1); }


    constructor(private service: JarService, protected dialog: MatDialog, private snackBar: MatSnackBar) { }

    ngOnInit(): void {
        this.jar = this.infos.jar;
        this.currentUserId = this.infos.user;
        this.remaining = JarHelperService.remainingDays(this.infos.jar.closingDate);
        this.currentMember = this.jar.members.find(member => member.userId === this.currentUserId);
        this.currentUserBalance = this.currentMember.balance;
    }

    pay(): void {
        const balance = this.currentUserBalance;
        const jarId = this.jar.id;
        const addresseeLink = this.jar.addressee.link;
        const dialogRef = this.dialog.open(PayComponent, { data: { balance , jarId, addresseeLink }, disableClose: true });
        dialogRef.afterClosed().subscribe((payed) => {
            if (payed) {
                this.service.pay(this.jar.id).subscribe(() => {
                    this.snackBar.open('You supported the association with success !', 'close', { duration: 3000 });
                    this.currentMember.payed = true;
                    }, err => this.snackBar.open(err, 'close', { duration: 3000 }));
                if (this.leftTopay === 0) {
                    this.activeEvent.emit('PAYED');
                }
            }
        });
    }

    isVisible() {
        const currentMember =
            this.jar.members.find(current => current.userId === this.currentUserId);
        return !(currentMember.payed || currentMember.balance === 0);
    }

}
