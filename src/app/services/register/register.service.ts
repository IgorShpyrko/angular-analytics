import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../../constants/api';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private _http: HttpClient) { }

  register(newUser) {
    console.log(newUser)
    console.log(JSON.stringify(newUser))
    if (!newUser) {
      return
    }
    return this._http.put(`${API.serverUrl}${API.registerUrl}`, JSON.stringify(newUser), httpOptions)
  }
}
