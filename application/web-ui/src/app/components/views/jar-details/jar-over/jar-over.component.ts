import { Component, OnInit, Input } from '@angular/core';
import { JarDetails, MemberDetails } from 'src/app/models';
import { JarService } from 'src/app/services/domain/jar/jar.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-jar-over',
    templateUrl: './jar-over.component.html',
    styleUrls: ['./jar-over.component.scss']
})
export class JarOverComponent implements OnInit {

    remaining: number;

    @Input() infos: any;

    jar: JarDetails;
    currentUserId: number;

    get today(): Date { return new Date(Date.now()); }
    get confessions(): number { return this.service.countJarConfessions(this.jar); }

    constructor(private service: JarService, protected dialog: MatDialog) { }

    ngOnInit(): void {
        this.jar = this.infos.jar;
        this.currentUserId = this.infos.user;
        this.remaining = this.service.remainingDays(this.infos.jar.closingDate);
    }

    pay(): void {
        console.log('payed');
    }

}
