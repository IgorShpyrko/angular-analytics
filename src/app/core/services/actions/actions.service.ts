import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import API from '../../constants/';
import { TokenService } from 'src/app/core/services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  constructor(
    private _http: HttpClient,
    private _tokenService: TokenService) { };

  getAvailable() {
    const url = `${API.serverUrl}${API.actions.getAvailable}`;

    return this._http.get(url).toPromise();
  };

  get(siteUUID: string) {
    if (!this._tokenService.getAccessToken()) return;

    const url = `${API.serverUrl}${API.actions.get}/${siteUUID}`;

    const options = {
      mode: 'cors',
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._http.get(url, options).toPromise();
  };

  update(siteUUID: string, newList: string[]) {
    const url = `${API.serverUrl}${API.actions.update}/${siteUUID}`;

    const body = {
      newList: newList
    }

    const options = {
      mode: 'cors',
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._http.put(url, body, options).toPromise();
  }
}
