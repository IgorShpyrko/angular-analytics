import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../constants/api';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _http: HttpClient) { }

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
      user: {
        email: user.email,
        password: user.password
      }
    }

    return this._http.post(`${API.serverUrl}${API.loginUrl}`, bodyParams)
  }
}
