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

  async deleteEvents(uuid: string, eventList) {
    const url = `${API.serverUrl}${API.events}${API.deleteAttach}`;

    const body = {
      "siteUuid": uuid,
      "events": eventList || []
    };

    const bodyParams = {
      mode: 'cors',
      headers: this.headers,
      body: body
    };

    try {
      return this._http.delete(url, bodyParams).toPromise();
    }
    catch (err) {
      console.log(err);
    }
  }

  async attachEvents(uuid: string, eventList) {
    const url = `${API.serverUrl}${API.events}${API.attach}`; 

    const bodyParams = {
      "site": {
        "uuid": uuid,
        "events": eventList || []
      }
    };

    try {
      return this._http.post(url, bodyParams).toPromise();
    }
    catch (err) {
      console.log(err);
    }
  }

  async getAllSites() {
    if (!this.token) return;

    const url = `${API.serverUrl}${API.sites}`;

    const bodyParams = {
      mode: 'cors',
      headers: this.headers
    };

    try {
      return this._http.get(url, bodyParams).toPromise();
    }
    catch (err) {
      console.log(err);
    }
  };

  async removeSite(uuid: number) {
    const url = `${API.serverUrl}${API.sites}/${uuid}`;

    const bodyParams = {
      mode: 'cors',
      headers: this.headers,
    };

    try {
      return this._http.delete(url, bodyParams).toPromise();
    }
    catch (err) {
      console.log(err);
    }
  }

  async addSite(site: string) {
    const url = `${API.serverUrl}${API.sites}${API.add}`;

    const bodyParams = {
      method: 'POST',
      mode: 'cors',
      site: site
    };

    try {
      return this._http.post(url, bodyParams).toPromise();
    }
    catch (err) {
      console.log(err);
    }
  }

  async editSite(uuid, newSite) {
    const url = `${API.serverUrl}${API.sites}${API.edit}`;

    const bodyParams = {
      method: 'PUT',
      mode: 'cors',
      headers: this.headers,
      address: newSite,
      uuid: uuid  
    };

    try {
      return this._http.put(url, bodyParams).toPromise();
    }
    catch (err) {
      console.log(err);
    }
  }
}
