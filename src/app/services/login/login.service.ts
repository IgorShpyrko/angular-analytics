import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../constants/api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _http: HttpClient) { }

  login(user) {
    if (!user) {
      return
    }
    console.log(user)
    return this._http.get(`${API.serverUrl}/${API.loginUrl}`)
  }
}
