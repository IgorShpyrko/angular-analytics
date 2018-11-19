import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../../constants/api';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetAllSitesService {
  constructor(private _http: HttpClient) { }

  getAll() {
    let token = window.localStorage.getItem('token');

    if (!token) {
      throwError('no token')
      return
    }

    const url = `${API.serverUrl}${API.getAllSites}`

    const headers = new HttpHeaders({
      'Content-Type':  'multipart/form-data',
      'Authorization': `Token ${token}`
    });

    const bodyParams = {
      method: 'POST',
      mode: 'cors',
      headers: headers
    }

    return this._http.get(url, bodyParams)
  }
}
