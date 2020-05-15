import { Component, OnDestroy, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { AssociationService } from 'src/app/services/domain/association/association.service';
import { Subject, merge, of } from 'rxjs';
import { takeUntil, map, startWith, switchMap, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AssociationCreateComponent } from './association-create/association-create.component';
import { FormFactory } from 'src/app/services';
import {MatSort} from '@angular/material/sort';
import { Patterns } from 'src/app/services/forms/utils';
import { MatPaginator } from '@angular/material/paginator';
import { DescriptionFormatterPipe } from 'src/app/services/pipes/description-formater.pipe';
import { MatTableDataSource } from '@angular/material/table';
import { AssociationView } from 'src/app/models';
import { AssociationPage } from 'src/app/models/association/association-page.model';

@Component({
    selector: 'app-association-office',
    templateUrl: './association-office.component.html',
    styleUrls: ['./association-office.component.scss'],
    providers: [DescriptionFormatterPipe],
})
export class AssociationOfficeComponent implements AfterViewInit, OnDestroy, OnChanges {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    private destroyed$ = new Subject(); // Subject to unsubscribe to all present Subscription at once
    displayedColumns: string[] = ['id', 'code', 'name', 'description', 'link', 'edit', 'delete'];
    associationList: AssociationView[];
    dataSource: MatTableDataSource<AssociationView>;
    patterns = Patterns;

    resultsLength = 0;
    isLoadingResults = true;

    constructor(private associationService: AssociationService, private dialog: MatDialog, private forms: FormFactory) {
        this.dataSource = new MatTableDataSource(this.associationList);
    }

    ngOnChanges(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.ngAfterViewInit();
    }

    ngAfterViewInit(): void {
        this.sort.active = 'id';
        this.paginator.pageSize = 5;
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page).pipe(
            startWith({}),
            switchMap(() => {
            this.isLoadingResults = true;
            return this.associationService.getAll(this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
            }),
            map(data => {
                // Flip flag to show that loading has finished.
                this.isLoadingResults = false;
                this.resultsLength = data.totalCount;
                return data.items;
            }),
            catchError(() => {
                this.isLoadingResults = false;
                return of([]);
            })
        ).subscribe(data => this.associationList = data);
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }


    create(): void {
        const dialogRef = this.dialog.open(AssociationCreateComponent,
        { width: '80vw', data: {} }
        );

        dialogRef.afterClosed().pipe(takeUntil(this.destroyed$)).subscribe(created => {
        console.log(created);
        if (created.created) {
            this.associationService.get(created.id).pipe(takeUntil(this.destroyed$))
            .subscribe(data => {
                this.associationList.push(data);
                this.ngAfterViewInit();
            });
        }
        });
    }

    delete(id: number): void {
        this.forms.confirmationStep('Are your sure you want to delete this association ?').pipe(takeUntil(this.destroyed$))
        .subscribe(result => {
            if (!!result) {
            this.associationService.delete(id).subscribe(() => {
                this.associationList = this.associationList.filter(association => association.id !== id);
                this.ngAfterViewInit();
            },
                err => this.forms.handleErrorMessages(err)
            );
            }
        });
    }

    edit(id: number): void {
        alert(' update coming soon!');
    }

}
