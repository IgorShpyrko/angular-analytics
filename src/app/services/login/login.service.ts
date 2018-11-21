import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../constants/api';
import { throwError } from 'rxjs';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private _http: HttpClient,
    private _tokenService: TokenService
    ) { }

  private isLoggedInSource = new BehaviorSubject(!!this._tokenService.get());
  isLoggedIn = this.isLoggedInSource.asObservable();

  changeIsLoggedIn(message: boolean) {
    this.isLoggedInSource.next(message)
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

    return this._http.post(`${API.serverUrl}${API.login}`, bodyParams)
  }

  logout() {
    this._tokenService.remove();
    this.changeIsLoggedIn(false)
  }
}
