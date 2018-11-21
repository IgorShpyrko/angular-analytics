import { Injectable } from '@angular/core';

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
}
