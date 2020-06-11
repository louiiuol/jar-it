import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserView, JarView } from 'src/app/models';
import { JarService } from 'src/app/services/domain/jar/jar.service';
import { JarDetailsComponent } from '../../../jar-details/jar-details.component';

@Component({
    selector: 'app-jar-preview',
    templateUrl: './jar-preview.component.html',
    styleUrls: ['./jar-preview.component.scss']
})

export class JarPreviewComponent {

    @Input() jar: JarView;
    @Input() user: UserView;

    get daysLeft() { return this.service.remainingDays(this.jar.closingDate); }
    get isCreated() { return this.jar.state.toString() === 'CREATED'; }
    get isActive() { return this.jar.state.toString() === 'ACTIVE'; }
    get isOver() { return this.jar.state.toString() === 'MAX_AMOUNT_REACHED' || this.jar.state.toString() === 'OUT_DATED'; }

    constructor(private dialog: MatDialog, private service: JarService) {}

    openDetails = (jar: any): any =>
        this.dialog.open(JarDetailsComponent, { data: {jar, user: this.user}, disableClose: true } )

}
