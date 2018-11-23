import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../../constants/api';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  constructor(private _http: HttpClient) { }

  private token:string = window.localStorage.getItem('token');

  private headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });

  getAll() {
    if (!this.token) return

    const url = `${API.serverUrl}${API.sites}`;

    const bodyParams = {
      mode: 'cors',
      headers: this.headers
    };

    return this._http.get(url, bodyParams);
  }

  removeSite(uuid: number) {
    const url = `${API.serverUrl}${API.sites}`;

    const bodyParams = {
      mode: 'cors',
      headers: this.headers,
      body: {
        uuid: uuid
      }
    };

    return this._http.delete(url, bodyParams);
  }

  addSite(site: string) {
    const url = `${API.serverUrl}${API.sites}${API.add}`;
    console.log(site)

    const bodyParams = {
      method: 'POST',
      mode: 'cors',
      site: site
    };

    return this._http.post(url, bodyParams);
  }

  editSite(newSite) {
    const url = `${API.serverUrl}${API.sites}${API.edit}`;

    const bodyParams = {
      method: 'PUT',
      mode: 'cors',
      headers: this.headers,
      newSite: newSite
    };

    return this._http.put(url, bodyParams);
  }
}
