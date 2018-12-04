import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API } from 'src/app/common/constants';
import { throwError } from 'rxjs';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _tokenService: TokenService,
    private _router: Router
    ) { }

  private isLoggedInSource = new BehaviorSubject(!!this._tokenService.get());
  isLoggedIn = this.isLoggedInSource.asObservable();

  changeIsLoggedIn(message: boolean) {
    this.isLoggedInSource.next(message);
    
    !message && this._tokenService.remove();
    !message && this._router.navigate(['/auth/login']);
  }

  login(user) {
    if (!user.email) {
      throwError('user name is required')
      return
    }

    if (!user.password) {
      throwError('password is required')
      return
    }

    let bodyParams = {
      customer: {
        email: user.email,
        password: user.password
      }
    }

    return this._http.post(`${API.serverAPI.serverUrl}${API.serverAPI.login}`, bodyParams)
  }

  logout() {
    this._tokenService.remove();
    this.changeIsLoggedIn(false);
    this._router.navigate(['/']);
  }
}
