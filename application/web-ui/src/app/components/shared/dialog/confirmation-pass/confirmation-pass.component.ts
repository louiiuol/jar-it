import { Component, Inject, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationPassData } from 'src/app/models';
import { PasswordOnlyForm } from 'src/app/services/forms/groups';
import { ErrorMessages, Patterns } from 'src/app/services/forms/utils';

@Component({
    selector: 'app-confirmation-pass',
    templateUrl: './confirmation-pass.component.html'
})
export class ConfirmationPassComponent implements OnDestroy {

    hide = true;
    readonly confirmationForm: FormGroup = PasswordOnlyForm;
    readonly errorMsg = ErrorMessages.user;
    readonly patterns = Patterns;

    get password() { return this.confirmationForm.get('password'); }
    get password_type(): string { return this.hide ? 'password' : 'text'; }
    get password_icon(): string { return this.hide ? 'hidden' : 'visible'; }
    get message() { return this.data.message; }

    constructor(
        private dialogRef: MatDialogRef<ConfirmationPassComponent>,
        @Inject(MAT_DIALOG_DATA) private data: ConfirmationPassData
    ) { }

    ngOnDestroy(): void {
        this.confirmationForm.reset();
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }

    onConfirm() {
        this.data.password = this.password.value;
        this.data.confirmed = true;
        return this.data;
    }

}
