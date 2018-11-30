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

  getSiteActions(siteUUID, event, callback = null) {
    if (!this.token) return;

    const url = `${API.serverUrl}${API.events}/${event}/${siteUUID}`;

    this._http.get(url, this.bodyParams)
      .subscribe(
        data => {
          console.log(data)
          if (callback) {
            callback()
          }
        },
        error => {
          console.log(error)
        }
      )
  };

  getAllActionsList(callback = null) {
    const url = `${API.serverUrl}${API.events}${API.allTypes}`;

    this._http.get(url)
      .subscribe(
        data => {
          if (callback) {
            callback(data)
          }
        },
      error => {
        console.log(error)
      })
  };

  getSubmitedActionsList(uuid, callback = null) {
    const url = `${API.serverUrl}${API.events}${API.attach}/${uuid}`;

    this._http.get(url)
      .subscribe(data => {
        if(callback) {
          callback(data)
        };
      },
      error => {
        console.log(error)
      });
  };

};
