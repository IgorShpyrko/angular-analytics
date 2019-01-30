import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError, BehaviorSubject } from 'rxjs';
import { MzToastService } from 'ngx-materialize';

import API from '../../constants/';
import { TokenService } from 'src/app/core/services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private _http: HttpClient,
    private _tokenService: TokenService,
    private _router: Router,
    private _toastService: MzToastService
  ) { }

  private isLoggedInSource = new BehaviorSubject(!!this._tokenService.getAccessToken());
  isLoggedIn = this.isLoggedInSource.asObservable();

  changeIsLoggedIn(message: boolean) {
    this.isLoggedInSource.next(message);  
    
    !message && this._tokenService.removeAll();
    !message && this._router.navigate(['/auth/login']);
  }

  register(customer: { login: string, email: string, password: string }) {
    if (!customer) {
      const message = 'no customer provided';
      this._toastService.show(message, 4000, 'red', () => {});
      return;
    };

    const url = `${API.serverUrl}${API.customer.register}`;

    const body = {
      ...customer
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._http.post(url, body, options).toPromise();
  };

  login(user: any) {
    if (!user.email) {
      const message = 'user name is required';
      this._toastService.show(message, 4000, 'red', () => {});
      return;
    };

    if (!user.password) {
      const message = 'password is required';
      this._toastService.show(message, 4000, 'red', () => {});
      return;
    };

    const url = `${API.serverUrl}${API.customer.login}`;

    const body = {
      email: user.email,
      password: user.password
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    return this._http.post(url, body, options).toPromise();
  };

  logout() {
    this._tokenService.removeAll();
    this.changeIsLoggedIn(false);
    this._router.navigate(['/']);
  };

  update(customer: { login: string, email: string, password: string }) {
    if (!customer) {
      const message = 'no customer provided';
      this._toastService.show(message, 4000, 'red', () => {});
      return;
    };

    const url = `${API.serverUrl}${API.customer.update}`;

    const body = {
      ...customer
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._http.put(url, body, options).toPromise();
  };

  delete() {
    const url = `${API.serverUrl}${API.customer.delete}`;

    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._http.put(url, options).toPromise();
  };
}
