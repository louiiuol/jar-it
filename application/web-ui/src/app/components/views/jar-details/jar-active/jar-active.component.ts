import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JarDetails } from 'src/app/models';
import { JarService } from 'src/app/services/domain/jar/jar.service';
import { ConfessComponent } from './confess/confess.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-jar-active',
    templateUrl: './jar-active.component.html',
    styleUrls: ['./jar-active.component.scss']
})
export class JarActiveComponent implements OnInit {

    @Input() infos: any;
    @Output() private readonly activeEvent = new EventEmitter<string>();

    get confessions() { return this.service.countJarConfessions(this.jar); }

    jar: JarDetails;
    currentUserId: number;
    remainingDays: number;

    constructor(private service: JarService, private dialog: MatDialog, private router: Router) {}

    ngOnInit(): void {
        this.jar = this.infos.jar;
        this.currentUserId = this.infos.user;
        this.remainingDays = this.service.remainingDays(this.infos.jar.closingDate);
    }

    confess() {
        const dialogRef = this.dialog.open(ConfessComponent, { data: this.infos, disableClose: true });
        dialogRef.afterClosed().subscribe(() => {
            this.service.getDetails(this.jar.id).subscribe(data => {
                this.jar = data;
                if (data.balance >= data.maxAmount) {
                    this.activeEvent.emit('MAX_AMOUNT_REACHED');
                }
            });
        });
    }

}
