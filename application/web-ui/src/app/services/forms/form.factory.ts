import { FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpErrorMessages } from './utils/error-messages';
import { ConfirmationMessageData, ConfirmationPassData } from 'src/app/models';
import { ConfirmationMessageComponent, ConfirmationPassComponent } from 'src/app/components/shared';

/**
 * Provides Factory to create formsand handle their behaviors
 */
@Injectable({ providedIn: 'root' })
export class FormFactory {

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) {
        this.fb = new FormBuilder();
    }

    builder = (): FormBuilder => this.fb;

    handleSuccessMessages = (message: any): MatSnackBarRef<SimpleSnackBar> =>
        this.snackBar.open(message, 'close', { duration: 3000 })

    handleErrorMessages = (err: any): MatSnackBarRef<SimpleSnackBar> => // To improve
        this.snackBar.open(this.generateInvalidRequestMessages(err).join(' - '), 'close', { duration: 30000 })

    confirmationStep = (msg: string): Observable<ConfirmationMessageData> => this.openDialog(ConfirmationMessageComponent, msg);

    confirmationPass = (msg: string): Observable<ConfirmationPassData> => this.openDialog(ConfirmationPassComponent, msg);

    private openDialog = (comp: any, msg: string): Observable<any> => this.dialog.open(comp, this.dialogConf(msg)).afterClosed();

    private dialogConf = (msg: string): MatDialogConfig => ({ width: '300px', disableClose: true, data: { message: msg } });

    private generateInvalidRequestMessages(err: any): string[] {
        const errorMessages: string[] = [];
        if (err.status === 401 || (err.status === 400 && err.error.error === 'invalid_grant')) {
        errorMessages.push(HttpErrorMessages.invalidCredentials);
        } else if (err.status === 0) {
        errorMessages.push(HttpErrorMessages.unreachableApi);
        } else if (err.status === 400) {
        errorMessages.push(...this.handleInvalidArguments(err));
        } else {
        errorMessages.push(err);
        }
        return errorMessages;
    }

    private handleInvalidArguments(err: any): string[] {
        const errorMessages: string[] = [];
        const errors = err.error.errors;
        if ( !!errors ) {
        errors.map( ( current: any ) => { errorMessages.push(current.error); } );
        }
        return errorMessages;
    }
}
