import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patterns } from 'src/app/services/forms/utils';
import { ConfessionService } from 'src/app/services/domain/jar/member/confession.service';
import { ConfessionUpdateDialogData, Confess } from 'src/app/models';
import { FormFactory } from 'src/app/services';

@Component({
    selector: 'app-confession-update',
    templateUrl: './confession-update.component.html',
    styleUrls: ['./confession-update.component.scss']
})
export class ConfessionUpdateComponent {

    readonly confessionControl = new FormControl(this.data.confession.swear,
        [Validators.required, Validators.pattern(Patterns.alphanumeric)]);

    constructor(
        private formFactory: FormFactory, private dialogRef: MatDialogRef<ConfessionUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) private data: ConfessionUpdateDialogData, private confessionService: ConfessionService) { }


    update(): void {
        const confess = new Confess(this.confessionControl.value, this.data.confession.author.id, this.data.jarId);
        this.confessionService.updateConfession(this.data.jarId, confess, this.data.confession.id)
            .subscribe(() => {
                this.dialogRef.close(this.confessionControl.value);
                this.formFactory.handleSuccessMessages('Confession updated with success !');
            }, err => this.formFactory.handleErrorMessages(err));
    }

    close = (): void => this.dialogRef.close();

}
