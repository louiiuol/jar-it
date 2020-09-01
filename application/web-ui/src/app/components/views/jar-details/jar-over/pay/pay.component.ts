import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { JarDetails } from 'src/app/models';
import { FormControl, Validators } from '@angular/forms';
import { Patterns } from 'src/app/services/forms/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfessComponent } from 'src/app/components/shared/confess/confess.component';
import { JarDialogData } from 'src/app/models/jar/jar-data.dialog';
import { ConfessionService } from 'src/app/services/domain/jar/member/confession.service';
import { JarService } from 'src/app/services/domain/jar/jar.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.scss']
})
export class PayComponent {

    @ViewChild('confessionInput', { static: false }) confessionInput: ElementRef<HTMLInputElement>;

    get jar(): JarDetails { return this.data.jar; }
    get reporterId(): number { return this.jar.members.find(member => member.userId === this.data.user).id; }

    isChecked = false;

    readonly confession = new FormControl('', [Validators.required, Validators.pattern(Patterns.alphanumeric)]);

    constructor(
        protected snackBar: MatSnackBar, protected dialogRef: MatDialogRef<ConfessComponent>, private jarService: JarService,
        @Inject(MAT_DIALOG_DATA) public data: JarDialogData, private router: Router) {}

    pay(): void {
        this.jarService.pay(this.jar.id).subscribe( () => {
            this.close();
            this.router.navigate(['/dashboard']);
            this.snackBar.open('You supported the association with success !', 'close', { duration: 3000 });
        }, err => this.snackBar.open(err, 'close', { duration: 3000 } ));
    }

    close = (): void => this.dialogRef.close();

}
