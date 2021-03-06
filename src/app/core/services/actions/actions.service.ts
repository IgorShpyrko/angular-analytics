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

    const url = `${API.serverUrl}${API.actions.get}${siteUUID}`;

    const options = {
      mode: 'cors',
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._http.get(url, options).toPromise();
  };

  update(siteUuid: string, newActions: string[]) {
    if (!newActions || newActions.length === 0) return;

    const url = `${API.serverUrl}${API.actions.update}`;

    const body = {
      siteUuid: siteUuid,
      actions: newActions
    }

    const options = {
      mode: 'cors',
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._http.put(url, body, options).toPromise();
  }

  delete(siteUuid: string, deletedActions: string[]) {
    if (!deletedActions || deletedActions.length === 0) return;

    const url = `${API.serverUrl}${API.actions.update}`;

    const params = {
      siteUuid: siteUuid,
      actions: deletedActions
    }

    const options = {
      mode: 'cors',
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      params: params
    };

    return this._http.delete(url, options).toPromise();
  }
}
