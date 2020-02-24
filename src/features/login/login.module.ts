import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../material/material.module';
import { LoginComponent } from '@app/features/login/login.component';
import { FirebaseModule } from '@app/features/firebase/firebase.module';

export const routes: Routes = [{ path: '', component: LoginComponent }];

const modules = [
  CommonModule,
  RouterModule,
  HttpClientModule,
  MaterialModule,
  ReactiveFormsModule,
  FirebaseModule,
  RouterModule.forChild(routes),
];

@NgModule({
  imports: [...modules],
  declarations: [LoginComponent],
})
export class LoginModule {}
