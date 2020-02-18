import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUserComponent } from './admin-user.component';

export const routes: Routes = [{ path: '', component: AdminUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class AdminUserRoutingModule {}
