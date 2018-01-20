import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';

import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  public isLoggedInStream: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth,
              private router: Router) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        console.log('user is sing in as ', user);
      } else {
        console.log('user is not sing in');
      }
    });
    this.isLoggedInStream = this.afAuth.authState
      .map<firebase.User, boolean>((user: firebase.User) => {
        return user != null;
      });
  }

  loginWithEmailAndPassword(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log('logged in ');
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

}
