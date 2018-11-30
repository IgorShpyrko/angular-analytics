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

  deleteEvents(uuid: string, eventList, callback = null) {
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

    this._http.delete(url, bodyParams)
      .subscribe(
        data => {
          if (callback) {
            callback(data)
          }
        },
        error => {
          console.log(error)
        }
      )
  }

  attachEvents(uuid: string, eventList, callback = null) {
    const url = `${API.serverUrl}${API.events}${API.attach}`; 

    const bodyParams = {
      "site": {
        "uuid": uuid,
        "events": eventList || []
      }
    };

    this._http.post(url, bodyParams)
      .subscribe(
        data => {
          if (callback) {
            callback(data)
          }
        },
        error => {
          console.log(error)
        });

  }

  getAllSites(callback = null) {
    if (!this.token) return

    const url = `${API.serverUrl}${API.sites}`;

    const bodyParams = {
      mode: 'cors',
      headers: this.headers
    };

    this._http.get(url, bodyParams)
      .subscribe(data => {
        if (callback) {
          callback(data)
        }
      },
        error => {
          console.log(error)
        }
      );
  }

  removeSite(uuid: number, callback = null) {
    const url = `${API.serverUrl}${API.sites}/${uuid}`;

    const bodyParams = {
      mode: 'cors',
      headers: this.headers,
    };

    this._http.delete(url, bodyParams)
      .subscribe(
        data => {
          if (callback) {
            callback(data)
          }
        },
        error => {
          console.log(error)
        }
      );
  }

  addSite(site: string, callback = null) {
    const url = `${API.serverUrl}${API.sites}${API.add}`;

    const bodyParams = {
      method: 'POST',
      mode: 'cors',
      site: site
    };

    this._http.post(url, bodyParams)
      .subscribe(
        data => {
          if (callback) {
            callback(data)
          }
        },
        error => {
          console.log(error)
        }
      )
  }

  editSite(uuid, newSite, callback = null) {
    const url = `${API.serverUrl}${API.sites}${API.edit}`;

    const bodyParams = {
      method: 'PUT',
      mode: 'cors',
      headers: this.headers,
      address: newSite,
      uuid: uuid  
    };

    this._http.put(url, bodyParams)
      .subscribe(
        data => {
          if (callback) {
            callback(data)
          }
        },
        error => {
          console.log(error)
        }
      )
  }
}
