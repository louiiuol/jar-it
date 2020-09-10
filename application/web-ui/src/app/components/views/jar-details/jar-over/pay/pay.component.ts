import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentDialogData } from 'src/app/models';

@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.scss']
})
export class PayComponent {

    isChecked = false;

    constructor(private dialogRef: MatDialogRef<PayComponent>, @Inject(MAT_DIALOG_DATA) public data: PaymentDialogData) {}

    pay = (): void => this.dialogRef.close(this.isChecked);

    close = (): void => this.dialogRef.close();

}
