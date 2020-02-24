import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { User } from '@app/features/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

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
