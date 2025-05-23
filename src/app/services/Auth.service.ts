import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, user } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private auth: Auth) {}

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    return signOut(this.auth);
  }

  getUser() {
    return user(this.auth); // Esto devuelve un Observable del usuario
  }
}
