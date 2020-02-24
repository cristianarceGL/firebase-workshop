import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { User } from '@app/features/models/user';
import { LoginService } from '@app/features/login/login.service';

@Component({
  selector: 'app-layout',
  template: `
    <mat-toolbar color="primary" class="app-header">
      <div><a routerLink="/">Firebase Workshop</a></div>
      <span class="nav-tool-items">
        <a *ngIf="user$ | async as user" mat-button>{{ user?.email }}</a>
        <a *ngIf="user$ | async" mat-button (click)="logOut()">Log out</a>
      </span>
    </mat-toolbar>
    <br />
    <ng-content></ng-content>
    <mat-toolbar color="primary" class="app-footer">
      <div><a routerLink="/"></a></div>
    </mat-toolbar>
  `,
  styles: [
    `
      .app-header {
        box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14),
          0 1px 18px 0 rgba(0, 0, 0, 0.12);
        justify-content: space-between;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 2;
      }

      .app-footer {
        box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14),
          0 1px 18px 0 rgba(0, 0, 0, 0.12);
        justify-content: space-between;
        left: 0;
        position: fixed;
        right: 0;
        bottom: 0;
        z-index: 2;
      }

      a {
        color: white;
        text-decoration: none;
      }

      a:hover,
      a:active {
        color: lightgray;
      }

      .navigation-items {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }

      mat-toolbar {
        border-radius: 3px;
      }

      @media (max-width: 959px) {
        mat-toolbar {
          border-radius: 0px;
        }
      }
    `,
  ],
})
export class LayoutComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private authService: LoginService) {}

  public ngOnInit(): void {
    this.user$ = this.authService.currentUser$;
  }

  public logOut(): void {
    this.authService.logOut();
  }
}
