import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '@app/features/models/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { SubscriptionService } from '@app/features/firebase/subscription.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firestore: AngularFirestore,
    private realtime: AngularFireDatabase,
    private subService: SubscriptionService
  ) {}

  // Create
  public createUser(user: User) {
    return this.firestore
      .collection('user')
      .doc(user.id)
      .set(user);
  }

  // Get Single
  public getUser(id: string): Observable<any> {
    return this.firestore.doc(`user/${id}`).snapshotChanges();
  }

  // Get List
  public getUserList(): Observable<any> {
    this.realtime
      .list(`user`)
      .valueChanges()
      .pipe(takeUntil(this.subService.unsubscribe$))
      .subscribe(realtimeUsers => realtimeUsers.map(user => this.createUser(user as User)));
    return this.firestore.collection('user').snapshotChanges();
  }

  // Update
  public updateUser(user: User): Promise<void> {
    return this.firestore.doc(`user/${user.id}`).update({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      address: user.address,
      cellphone: user.cellphone,
    });
  }

  // Delete
  public deleteUser(id: string): Promise<void> {
    return this.firestore.doc(`user/${id}`).delete();
  }
}
