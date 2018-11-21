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
    'Content-Type':  'multipart/form-data'
  });

  getAll() {
    if (!this.token) {
      console.error('no token in LocalStorage!!!')
    }

    const url = `${API.serverUrl}${API.sites}`;

    const bodyParams = {
      method: 'GET',
      mode: 'cors',
      headers: this.headers
    };

    return this._http.get(url, bodyParams);
  }

  removeSite(site: string) {
    const url = `${API.serverUrl}${API.sites}${API.deleteSite}`;

    const bodyParams = {
      method: 'DELETE',
      mode: 'cors',
      headers: this.headers,
      site: site
    };

    return this._http.delete(url, bodyParams);
  }

  addSite(site: string) {
    const url = `${API.serverUrl}${API.sites}${API.add}`;

    const bodyParams = {
      method: 'POST',
      mode: 'cors',
      headers: this.headers,
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
