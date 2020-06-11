import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationMessageData } from 'src/app/models';

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html'
})
export class ConfirmationMessageComponent {

  get message(): string { return this.data.message; }

  constructor(
    private dialogRef: MatDialogRef<ConfirmationMessageComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: ConfirmationMessageData
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): boolean {
    return true;
  }

}
