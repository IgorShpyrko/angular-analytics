import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../../constants/api';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     // 'Authorization': 'my-auth-token'
//   })
// };

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
    return this._http.post(`${API.serverUrl}${API.register}`, bodyParams)
  }
}
