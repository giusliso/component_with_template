import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export type Role = 'admin' | 'guest';

export interface Auth {
  token: string;
  role: Role;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth$: BehaviorSubject<Auth> = new BehaviorSubject(null);
  private readonly loginInStoreKey = 'login';

  signIn(role: Role = 'admin') {
    const login = {
      token: '123',
      role,
    };
    this.auth$.next(login);
    localStorage.setItem(this.loginInStoreKey, JSON.stringify(login));
  }

  signOut() {
    this.auth$.next(null);
    localStorage.removeItem(this.loginInStoreKey);
  }

  get isLogged$(): Observable<boolean> {
    return this.auth$.pipe(map((auth) => !!auth));
  }

  get role$(): Observable<Role> {
    return this.auth$.pipe(
      map((auth) => auth?.role)
    );
  }

  constructor() {
    const localData = localStorage.getItem(this.loginInStoreKey);
    if(localData){
      this.auth$.next(JSON.parse(localData));
    }
  }
}
