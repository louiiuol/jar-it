import { Component, OnInit, Input, OnDestroy, OnChanges, ViewChild } from '@angular/core';
import { UserView, JarView } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { JarService } from 'src/app/services/domain/jar/jar.service';
import { JarCreateComponent } from './jar-create/jar-create.component';
import { LoaderService } from 'src/app/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-jar-board',
    templateUrl: './jar-board.component.html',
    styleUrls: ['./jar-board.component.scss']
})
export class JarBoardComponent implements OnInit, OnChanges, OnDestroy {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @Input() user: UserView;

    jars: JarView[];

    sortActive = 'startingDate';
    direction = 'asc';
    pageStart = 0;
    pageSize = 5;
    resultsLength = 0;

    private destroyed$ = new Subject(); // Subject to unsubscribe to all present Subscription at once

    constructor(private dialog: MatDialog, private service: JarService, protected loader: LoaderService) { }

    ngOnInit(): void {
        this.fetchUserJars();
    }

    ngOnChanges() {
        if (this.paginatorChanged()) {
            this.pageStart = this.paginator.pageIndex;
            this.pageSize = this.paginator.pageSize;
            this.fetchUserJars();
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next(); // Unsubscribe to all events
    }

    newJar(): void {
        const dialogRef = this.dialog.open(JarCreateComponent,
            { maxWidth: '728x', disableClose: true, data: { author: this.user, created: false } });

        dialogRef.afterClosed().pipe(takeUntil(this.destroyed$))
            .subscribe(created => {
                if (created.created) {
                    this.service.get(created.id).pipe(takeUntil(this.destroyed$))
                        .subscribe(data => this.jars.push(data));
                }
            });
    }

    private paginatorChanged = (): boolean => !!this.paginator && (this.paginator.pageIndex !== this.pageStart
        || this.paginator.pageSize !== this.pageSize )

    private fetchUserJars(): void {
        this.service.getAllByUser(this.user.id, this.sortActive, this.direction, this.pageStart, this.pageSize)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(page => {
                this.jars = page.items;
                console.log(this.jars);
                this.resultsLength = page.totalCount;
            });
    }

}
