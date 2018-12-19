import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../../constants/';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private _http: HttpClient) { }

  register(customer: {email: string, password: string}) {
    if (!customer) {
      throwError('no customer');
    };

    const { email, password } = customer;

    const bodyParams = {
      customer: { email, password }
    };

    return this._http.post(`${API.serverAPI.serverUrl}${API.serverAPI.register}`, bodyParams).toPromise();
  }
}
