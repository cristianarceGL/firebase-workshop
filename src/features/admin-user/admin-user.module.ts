import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminUserEditComponent } from './admin-user-edit.component';
import { MaterialModule } from '@app/features/material/material.module';
import { AdminUserComponent } from '@app/features/admin-user/admin-user.component';

export const routes: Routes = [{ path: '', component: AdminUserComponent }];

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  RouterModule,
  RouterModule.forChild(routes),
];

@NgModule({
  imports: [...modules],
  declarations: [AdminUserComponent, AdminUserEditComponent],
  entryComponents: [AdminUserEditComponent],
})
export class AdminUserModule {}
