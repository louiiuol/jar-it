import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Patterns } from 'src/app/services/forms/utils';
import { ConfessionService } from 'src/app/services/domain/jar/member/confession.service';
import { JarDetails, Confess, JarDialogData } from 'src/app/models';
import { FormFactory } from 'src/app/services';

@Component({
    selector: 'app-confess',
    templateUrl: './confess.component.html',
    styleUrls: ['./confess.component.scss']
})
export class ConfessComponent {

    get jar(): JarDetails { return this.data.jar; }
    get reporterId(): number { return this.jar.members.find(member => member.userId === this.data.user).id; }

    readonly confessionControl = new FormControl('', [Validators.required, Validators.pattern(Patterns.alphanumeric)]);

    constructor(
        private dialogRef: MatDialogRef<ConfessComponent>, @Inject(MAT_DIALOG_DATA) private data: JarDialogData,
        private formFactory: FormFactory, private confessionService: ConfessionService) { }

    confess(): void {
        const confess = new Confess(this.confessionControl.value, this.reporterId, this.jar.id);
        this.confessionService.confess(confess, this.jar.id).subscribe( () => {
            this.dialogRef.close(confess);
            this.formFactory.handleSuccessMessages('Confession added with success !');
        }, err => this.formFactory.handleErrorMessages(err));
    }

    close = (): void => this.dialogRef.close();

}
