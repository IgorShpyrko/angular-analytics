import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

import { API } from 'src/app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private _http: HttpClient) { };

  setAccessToken(token: string) {
    try {
      window.localStorage.setItem('accessToken', token);
    } catch (error) {
      console.log(error)
    }
    return;
  };

  setRefreshToken(token: string) {
    try {
      window.localStorage.setItem('refreshToken', token);
    } catch (error) {
      console.log(error)
    }
    return;
  };

  setAll(tokens: {accessToken: string, refreshToken: string}): void {
    this.setAccessToken(tokens.accessToken);
    this.setRefreshToken(tokens.refreshToken);
  }

  getRefreshToken() {
    return window.localStorage.getItem('refreshToken') || null;
  };

  getAccessToken() {
    return window.localStorage.getItem('accessToken') || null;
  };

  removeRefreshToken() {
    window.localStorage.removeItem('refreshToken');
    return;
  };

  removeAccessToken() {
    window.localStorage.removeItem('accessToken');
    return;
  };

  removeAll() {
    this.removeAccessToken();
    this.removeRefreshToken();
  };

  getRefreshTokenExpire() {
    const token = this.getRefreshToken();
    if (!token) return null;

    const decoded = jwt_decode(token);

    return decoded.exp;
  };

  getAccessTokenExpire() {
    const token = this.getAccessToken();
    if (!token) return null;

    const decoded = jwt_decode(token);

    return decoded.exp;
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

    const bodyParams = { accessToken, refreshToken }

    return this._http.post(url, bodyParams).toPromise()
      .then((data: {accessToken: string, refreshToken: string}) => {
        this.setAll(data)
      })
      .catch(err => {
        console.log(err)
      })

  };

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
