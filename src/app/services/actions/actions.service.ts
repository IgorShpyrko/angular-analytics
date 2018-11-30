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

  async getSiteActions(siteUUID, event) {
    if (!this.token) return;

    const url = `${API.serverUrl}${API.events}/${event}/${siteUUID}`;

    try {
      return this._http.get(url, this.bodyParams).toPromise();
    }
    catch (err) {
      console.log(err);
    }
  };

  async getAllActionsList() {
    const url = `${API.serverUrl}${API.events}${API.allTypes}`;

    try {
      return this._http.get(url).toPromise();
    }
    catch (err) {
      console.log(err);
    }
  };

  async getSubmitedActionsList(uuid) {
    const url = `${API.serverUrl}${API.events}${API.attach}/${uuid}`;

    try {
      return this._http.get(url).toPromise();
    }
    catch (err) {
      console.log(err);
    }
  };

}
