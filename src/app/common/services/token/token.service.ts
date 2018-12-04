import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { };

  set(token) {
    window.localStorage.setItem('token', token);
    return;
  };

  get() {
    return window.localStorage.getItem('token');
  };

  remove() {
    window.localStorage.removeItem('token');
    return;
  };

  getTokenExpirationDate(token: string) {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) { return null };

    return decoded.exp
  }

  isTokenExpired(): boolean {
    const token = this.get();

    if (!token) {
      throwError('no token');
      return
    }

    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) { return null };

    return (decoded.exp < (Date.now() / 1000))
  }
}
