import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from './models/user';
import { Authenticate } from './models/authenticate';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public user: User;

  public get isAuthenticated$(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => user !== null));
  }

  public get currentUser$(): Observable<User | undefined> {
    return this.afAuth.authState.pipe(map(user => user));
  }

  constructor(private afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      user !== null ? (this.user = user) : this.router.navigate([`user`]);
    });
  }

  public async logIn(authenticate: Authenticate): Promise<void> {
    await this.afAuth.auth
      .signInWithEmailAndPassword(authenticate.email, authenticate.password)
      .then(_ => this.router.navigate([`user`]))
      .catch(_ => console.log('error while looging user in'));
  }

  public async logOut(): Promise<void> {
    await this.afAuth.auth
      .signOut()
      .then(_ => console.log('user successfully loged out'))
      .catch(_ => console.log('error while looging user out'));
    this.router.navigate([`login`]);
  }
}
