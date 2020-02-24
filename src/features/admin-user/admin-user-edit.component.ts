import { Component, Inject, Optional } from '@angular/core';

import { User } from '@app/features/models/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@app/features/material/material.module';

@Component({
  selector: 'app-dialog-box',
  template: `
    <h1 mat-dialog-title>
      <strong>{{ action }}</strong> this element?
    </h1>
    <div mat-dialog-content>
      <div *ngIf="action != 'Delete'; else elseTemplate">
        <mat-form-field>
          <input placeholder="{{ action }} Address" matInput [(ngModel)]="user.address" />
        </mat-form-field>
        <mat-form-field>
          <input placeholder="{{ action }} Cellphone" matInput [(ngModel)]="user.cellphone" />
        </mat-form-field>
      </div>
      <ng-template #elseTemplate>
        Sure to delete <b>{{ user.displayName }}</b
        >?
      </ng-template>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="doAction()">{{ action }}</button>
      <button mat-button (click)="closeDialog()" mat-flat-button color="warn">Cancel</button>
    </div>
  `,
  styles: [''],
})
export class AdminUserEditComponent {
  public action: string;
  public user: User;

  constructor(
    public dialogRef: MatDialogRef<AdminUserEditComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { action: string; user: User }
  ) {
    console.table({ action: data.action, ...data.user });
    this.user = { ...data.user };
    this.action = this.data.action;
  }

  public doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.user });
  }

  public closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
