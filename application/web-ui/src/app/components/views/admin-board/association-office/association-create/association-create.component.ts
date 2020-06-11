import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssociationCreateData } from 'src/app/models/utils/dialog/association-create-data.dialog';
import { AssociationForm } from 'src/app/services/forms/groups';
import { FormGroup, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { ErrorMessages, Patterns } from 'src/app/services/forms/utils';
import { AssociationService } from 'src/app/services/domain/association/association.service';
import { FormFactory } from 'src/app/services';
import { AssociationCreate } from 'src/app/models';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
    selector: 'app-association-create',
    templateUrl: './association-create.component.html',
    styleUrls: ['./association-create.component.scss']
})
export class AssociationCreateComponent implements OnDestroy {

    private destroyed$ = new Subject(); // Subject to unsubscribe to all present Subscription at once
    associationForm: FormGroup;
    readonly errorMsg = ErrorMessages.association;
    readonly patterns = Patterns;

    get name(): AbstractControl { return this.associationForm.get('name'); }
    get code(): AbstractControl { return this.associationForm.get('code'); }
    get description(): AbstractControl { return this.associationForm.get('description'); }
    get link(): AbstractControl { return this.associationForm.get('link'); }

    constructor(
        private forms: FormFactory, private associationService: AssociationService,
        private dialogRef: MatDialogRef<AssociationCreateComponent>,
        @Inject(MAT_DIALOG_DATA) private data: AssociationCreateData) {
            this.init();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onCreate(): void {
        if (this.associationForm.valid) {
        const association = new AssociationCreate(this.name.value, this.code.value, this.description.value, this.link.value);
        this.associationService.create(association).pipe(takeUntil(this.destroyed$))
            .subscribe((id) => {
            this.data.id = id;
            this.data.created = true;
            this.dialogRef.close(this.data);
        },
        err => this.forms.handleErrorMessages(err));
        }
    }

    private init(): void {
        this.associationForm = this.forms.builder().group({
            name: AssociationForm.name,
            code: AssociationForm.code,
            description: AssociationForm.description,
            link: AssociationForm.link
        });
    }

}
