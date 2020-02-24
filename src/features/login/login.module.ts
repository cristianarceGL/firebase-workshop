import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../material/material.module';
import { LoginComponent } from '@app/features/login/login.component';
import { LoginRoutingModule } from '@app/features/login/login-routing.module';

const modules = [CommonModule, LoginRoutingModule, RouterModule, HttpClientModule, MaterialModule, ReactiveFormsModule];

@NgModule({
  imports: [...modules],
  declarations: [LoginComponent],
})
export class LoginModule {}
