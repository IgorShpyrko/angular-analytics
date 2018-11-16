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

    let bodyParams = {
      user: {
        email: user.name,
        password: user.password
      }
    }
    console.log(bodyParams)

    // "user": {
    //   "email" : "valik5@gmail.com",
    //   "password": "valik571696"	
    // }
    console.log(user)
    return this._http.post(`${API.serverUrl}${API.loginUrl}`, bodyParams)
  }
}
