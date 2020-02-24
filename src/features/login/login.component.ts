import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-wrapper" fxLayout="row" fxLayoutAlign="center center">
      <mat-card class="container">
        <mat-card-header>
          <mat-card-title color="primary">Email/Password</mat-card-title>
        </mat-card-header>
        <form class="login-form" [formGroup]="loginForm">
          <mat-card-content>
            <mat-form-field class="login-full-width">
              <input matInput placeholder="Email" type="text" formControlName="username" />
            </mat-form-field>
            <mat-form-field class="login-full-width">
              <input matInput placeholder="Password" type="password" formControlName="password" />
            </mat-form-field>
          </mat-card-content>
          <button mat-stroked-button color="primary" class="btn-block" type="button" (click)="login()">Log In</button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .container {
        -ms-transform: scale(1);
        -webkit-transform: scale(1);
        background: #fff;
        border-radius: 10px;
        float: left;
        max-width: 330px;
        opacity: 1;
        padding: 60px 50px 40px 50px;
        position: relative;
        top: 0;
        transform: scale(1);
        width: 100%;
        z-index: 5;
      }

      .container:before {
        -ms-transform: scale(0.95);
        -webkit-transform: scale(0.95);
        background: rgba(255, 255, 255, 0.6);
        border-radius: 10px;
        content: '';
        height: 30px;
        left: 0;
        position: absolute;
        top: -10px;
        transform: scale(0.95);
        width: 100%;
        z-index: -1;
      }

      .login-wrapper {
        height: 100%;
      }

      .login-wrapper .login-form {
        max-width: 300px;
        min-width: 100%;
        width: 100%;
      }

      .login-wrapper .login-full-width,
      .login-wrapper .btn-block {
        width: 100%;
      }

      .login-wrapper mat-card-header {
        display: block;
        font-weight: 700;
        text-align: center;
        width: 100%;
      }

      .login-wrapper mat-card-header mat-card-title {
        color: #673ab6;
        font-size: 30px;
        margin: 0;
      }

      .login-wrapper .mat-card {
        padding: 40px 70px 50px;
      }

      .login-wrapper .mat-stroked-button {
        background: #fff7fa;
        border: 1px solid currentColor;
        line-height: 54px;
      }

      .login-wrapper .mat-form-field-appearance-legacy .mat-form-field-infix {
        padding: 0.8375em 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private loginService: LoginService) {}

  public login(): void {
    this.loginService.logIn({
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
    });
  }
}
