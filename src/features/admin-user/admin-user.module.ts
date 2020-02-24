import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/features/material/material.module';
import { AdminUserComponent } from '@app/features/admin-user/admin-user.component';
import { AdminUserRoutingModule } from '@app/features/admin-user/admin-user-routing.module';

const modules = [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterModule, AdminUserRoutingModule];

@NgModule({
  imports: [...modules],
  declarations: [AdminUserComponent],
})
export class AdminUserModule {}
