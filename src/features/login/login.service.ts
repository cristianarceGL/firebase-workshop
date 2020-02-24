import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { User } from './models/user';
import { Authenticate } from './models/authenticate';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public user: User;

  public get isAuthenticated$(): Observable<boolean> {
    return of(false);
  }

  public get currentUser$(): Observable<User | undefined> {
    return of(undefined);
  }

  constructor(public router: Router) {}

  public async logIn(authenticate: Authenticate): Promise<void> {
    return Promise.resolve();
  }

  public async logOut(): Promise<void> {
    return Promise.resolve();
  }
}
