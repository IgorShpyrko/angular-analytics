import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../../constants/api';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  constructor(private _http: HttpClient) { };

  private token:string = window.localStorage.getItem('token');

  private headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });

  private bodyParams = {
    mode: 'cors',
    headers: this.headers
  };

  getActions(siteUUID, event) {
    if (!this.token) return;

    const url = `${API.serverUrl}${API.events}/${event}/${siteUUID}`;

    return this._http.get(url, this.bodyParams);
  };

  getSubmitedActionsList(uuid) {
    const url = `${API.serverUrl}${API.events}${API.attach}/${uuid}`;

    return this._http.get(url);
  };

  getActionsList() {
    const url = `${API.serverUrl}${API.events}${API.allTypes}`;

    return this._http.get(url)
  }
};
