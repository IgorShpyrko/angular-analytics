import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../constants/';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private _http: HttpClient) { }

  register(newUser) {
    if (!newUser) {
      return
    }

    const bodyParams = {
      customer: {
        email: newUser.email,
        password: newUser.password
      }
    }
    return this._http.post(`${API.serverAPI.serverUrl}${API.serverAPI.register}`, bodyParams)
  }
}
