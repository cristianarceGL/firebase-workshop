import { FirebaseUser } from '@app/features/firebase/firebase.model';

export class User implements FirebaseUser {
  constructor(
    public uid: string,
    public displayName: string | null,
    public email: string | null,
    public phoneNumber: string | null = '',
    public photoURL: string | null = '',
    public id?: string,
    public address?: string,
    public cellphone?: string
  ) {}
}
