import { takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '@app/features/models/user';
import { AdminUserEditComponent } from './admin-user-edit.component';
import { SubscriptionService } from '@app/features/firebase/subscription.service';
import { MatTableDataSource, MatDialog } from '@app/features/material/material.module';

@Component({
  selector: 'app-admin-user',
  template: `
    <div class="datasource" *ngIf="dataSource; else showSpinner">
      <table mat-table [dataSource]="dataSource" matSort>
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>FirebaseId</th>
          <td mat-cell *matCellDef="let element">{{ element.id }}</td>
        </ng-container>

        <ng-container matColumnDef="uid">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>UserId</th>
          <td mat-cell *matCellDef="let element">{{ element.uid }}</td>
        </ng-container>

        <ng-container matColumnDef="displayName">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>DisplayName</th>
          <td mat-cell *matCellDef="let element">{{ element.displayName }}</td>
        </ng-container>

        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
          <td mat-cell *matCellDef="let element">{{ element.email }}</td>
        </ng-container>

        <ng-container matColumnDef="address">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Address</th>
          <td mat-cell *matCellDef="let element">{{ element.address }}</td>
        </ng-container>

        <ng-container matColumnDef="cellphone">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Cellphone</th>
          <td mat-cell *matCellDef="let element">{{ element.cellphone }}</td>
        </ng-container>

        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef>Edit</th>
          <td mat-cell *matCellDef="let element" class="action-link">
            <a (click)="openDialog('Update', element)">Edit</a> |
            <a (click)="openDialog('Delete', element)">Delete</a>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>

    <ng-template #showSpinner>
      <div class="loading-indicator">
        <mat-progress-spinner [color]="'accent'" [mode]="'indeterminate'" [value]="50"> </mat-progress-spinner>
      </div>
    </ng-template>
  `,
  styles: [
    `
      table {
        min-height: 150px !important;
        overflow-x: auto;
        overflow-y: hidden;
        width: 100%;
      }

      th.mat-header-cell {
        max-width: 350px !important;
        text-align: left;
      }

      .datasource {
        margin-top: 5vh;
      }

      .mat-cell.action-link {
        color: blue;
      }

      a:active,
      a:hover {
        color: purple;
      }

      /* Absolute Center Spinner */
      .loading-indicator {
        position: fixed;
        z-index: 999;
        height: 25vh;
        width: 0vw;
        overflow: show;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
    `,
  ],
})
export class AdminUserComponent implements OnInit, OnDestroy {
  public displayedColumns = ['id', 'uid', 'displayName', 'email', 'address', 'cellphone', 'action'];
  public dataSource = null;

  constructor(public dialog: MatDialog, private subService: SubscriptionService) {}

  public ngOnInit(): void {}

  public ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

  public updateUser(user: User): void {}

  public deleteUser(user: User): void {}

  public openDialog(action: string, user: User): void {
    const dialogData = { action, user };
    const dialogRef = this.dialog.open(AdminUserEditComponent, {
      width: '250px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Update') {
        this.updateUser(result.data);
      } else if (result.event === 'Delete') {
        this.deleteUser(result.data);
      }
    });
  }

  private convertToUser(element: any) {
    const { uid, email, displayName, cellphone, address } = element.payload.doc.data() as User;
    return {
      id: element.payload.doc.id,
      uid,
      email,
      displayName,
      cellphone,
      address,
    } as User;
  }
}
