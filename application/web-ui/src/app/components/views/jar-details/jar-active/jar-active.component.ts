import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JarDetails, Confession } from 'src/app/models';
import { ConfessComponent } from '../../../shared/confess/confess.component';
import { JarHelperService } from 'src/app/services/domain/jar/Jar-helper.service';
import { ConfessionService } from 'src/app/services/domain/jar/member/confession.service';

@Component({
    selector: 'app-jar-active',
    templateUrl: './jar-active.component.html',
    styleUrls: ['./jar-active.component.scss']
})
export class JarActiveComponent implements OnInit {

    @Input() infos: any;
    @Output() private readonly activeEvent = new EventEmitter<string>();

    confessionsCount: number;
    confessionsList: Confession[];
    jar: JarDetails;
    currentUserId: number;
    remainingDays: number;

    constructor(private service: ConfessionService, private dialog: MatDialog) {}

    ngOnInit(): void {
        this.jar = this.infos.jar;
        this.currentUserId = this.infos.user;
        this.remainingDays = JarHelperService.remainingDays(this.infos.jar.closingDate);
        this.confessionsList = JarHelperService.getConfessions(this.jar);
        this.confessionsCount = JarHelperService.getConfessionsCount(this.jar);
    }

    confess() {
        const dialogRef = this.dialog.open(ConfessComponent, { data: this.infos, disableClose: true });
        dialogRef.afterClosed().subscribe(() => {
            this.service.getJarConfessions(this.jar.id).subscribe((data: Confession[]) => {
                console.log(data);
                this.confessionsCount++;
                this.confessionsList = data;
                this.checkMaxAmount();
            });
        });
    }

    private checkMaxAmount(): void {
        if ( (this.jar.balance + this.jar.referenceCost) >= this.jar.maxAmount) {
            this.activeEvent.emit('MAX_AMOUNT_REACHED');
        }
        this.jar.balance += this.jar.referenceCost;
    }

}
