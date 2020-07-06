import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { JarDialogData } from 'src/app/models/jar/jar-data.dialog';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patterns } from 'src/app/services/forms/utils';
import { Confess } from 'src/app/models/jar/confession/confess-model';
import { ConfessionService } from 'src/app/services/domain/jar/member/confession.service';
import { JarDetails } from 'src/app/models';

@Component({
    selector: 'app-confess',
    templateUrl: './confess.component.html',
    styleUrls: ['./confess.component.scss']
})
export class ConfessComponent {

    @ViewChild('confessionInput', { static: false }) confessionInput: ElementRef<HTMLInputElement>;

    get jar(): JarDetails { return this.data.jar; }
    get reporterId(): number { return this.jar.members.find(member => member.userId === this.data.user).id; }

    readonly confession = new FormControl('', [Validators.required, Validators.pattern(Patterns.text)]);

    constructor(
        protected snackBar: MatSnackBar, protected dialogRef: MatDialogRef<ConfessComponent>,
        @Inject(MAT_DIALOG_DATA) public data: JarDialogData, private confessionService: ConfessionService) {}

    confess(): void {
        const confess = new Confess(this.confession.value, this.reporterId, this.jar.id);
        this.confessionService.confess(confess, this.jar.id).subscribe( () => {
            this.close();
            this.snackBar.open('Confession added with success !', 'close', { duration: 3000 });
        }, err => this.snackBar.open(err, 'close', { duration: 3000 } ));
    }

    close = (): void => this.dialogRef.close();

}
