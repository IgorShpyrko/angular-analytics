import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MockTokenService {
  constructor( ) { };

  createFakeToken() {
    let token = window.localStorage.getItem('token');
    
    if(!token) {
      window.localStorage.setItem('token', 'test123456')
    }
  };

  removeFakeToken() {
    window.localStorage.removeItem('token')
  };
}