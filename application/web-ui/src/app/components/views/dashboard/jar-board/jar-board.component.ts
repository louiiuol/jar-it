import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserView, JarView } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { JarService } from 'src/app/services/domain/jar/jar.service';
import { JarCreateComponent } from './jar-create/jar-create.component';
import { LoaderService } from 'src/app/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-jar-board',
    templateUrl: './jar-board.component.html',
    styleUrls: ['./jar-board.component.scss']
})
export class JarBoardComponent implements OnInit, OnDestroy {

    @Input() user: UserView;

    jars: JarView[];

    private destroyed$ = new Subject(); // Subject to unsubscribe to all present Subscription at once

    constructor(private dialog: MatDialog, private service: JarService, protected loader: LoaderService) { }

    ngOnInit(): void {
        this.service.getAllByUser(this.user.id).pipe(takeUntil(this.destroyed$))
            .subscribe(page => this.jars = page);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    newJar(): void {
        const dialogRef = this.dialog.open(JarCreateComponent,
            { maxWidth: '600px', disableClose: true, data: { author: this.user, created: false } });

        dialogRef.afterClosed().pipe(takeUntil(this.destroyed$))
            .subscribe(created => {
                if (created.created) {
                    this.service.get(created.id).pipe(takeUntil(this.destroyed$))
                        .subscribe(data => this.jars.push(data));
                }
            });
    }

}
