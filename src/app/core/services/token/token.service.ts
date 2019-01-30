import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { MzToastService } from 'ngx-materialize';

import API from 'src/app/core/constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(
    private _http: HttpClient,
    private _toastService: MzToastService
  ) { };

  setAccessToken(token: string) {
    try {
      if (!token) {
        throw new Error('no token provided')
      }
      window.localStorage.setItem('accessToken', token);
    } catch (error) {
      this._toastService.show(error.message, 4000, 'red', () => {});
    }
    return;
  };

  setRefreshToken(token: string) {
    try {
      window.localStorage.setItem('refreshToken', token);
    } catch (error) {
      this._toastService.show(error.message, 4000, 'red', () => {});
    }
    return;
  };

  setAll(tokens: { accessToken: string, refreshToken: string }): void {
    try {
      this.setAccessToken(tokens.accessToken);
      this.setRefreshToken(tokens.refreshToken);
    } catch (error) {
      this._toastService.show(error.message, 4000, 'red', () => {});
    }
  }

  getRefreshToken() {
    return window.localStorage.getItem('refreshToken') || null;
  };

  getAccessToken() {
    return window.localStorage.getItem('accessToken') || null;
  };

  removeRefreshToken() {
    try {
      window.localStorage.removeItem('refreshToken');
      return true;
    } catch (error) {
      return false;
    }
  };

  removeAccessToken() {
    try {
      window.localStorage.removeItem('accessToken');
      return true;
    } catch (error) {
      return false;
    }
  };

  removeAll() {
    try {
      this.removeAccessToken();
      this.removeRefreshToken();
      return true;
    } catch (error) {
      return false;
    }
  };

  getRefreshTokenExpire() {
    try {
      const decoded = jwt_decode(this.getRefreshToken());

      return decoded.exp;
    } catch (error) {
      return null
    }
  };

  getAccessTokenExpire() {
    try {
      const decoded = jwt_decode(this.getAccessToken());
      
      return decoded.exp;
    } catch (error) {
      return null
    }
  };

  isExpiredRefreshToken() {
    const tokenExp = this.getRefreshTokenExpire();
    const now = Math.round(Date.now() / 1000);

    return now > tokenExp;
  };

  isExpiredAccessToken() {
    const tokenExp = this.getAccessTokenExpire();
    const now = Math.round(Date.now() / 1000);

    return now > tokenExp;
  };

  refreshToken() {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    const url = `${API.serverAPI.serverUrl}${API.serverAPI.refreshToken}`;

    const body = {
      accessToken,
      refreshToken
    };

    const options = {
      mode: 'cors',
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
    };

    return this._http.post(url, body, options).toPromise()
      .then((data: {accessToken: string, refreshToken: string}) => {
        this.setAll(data)
      })
      .catch(err => {
        console.log(err)
      })

  };
}
