import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../../constants/api';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  constructor(private _http: HttpClient) { }

  private token:string = window.localStorage.getItem('token');

  private headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });


  getActions(siteUUID, event) {
    if (!this.token) return

    const url = `${API.serverUrl}/api${API.events}/${event}/${siteUUID}`
    console.log(url)

    const bodyParams = {
      mode: 'cors',
      headers: this.headers
    };  

    return this._http.get(url, bodyParams);
  }

}
