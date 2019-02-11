import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import API from 'src/app/core/constants';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private _http: HttpClient) {}

  get(action: string, siteUuid: string) {
    const url = `${API.serverUrl}${API.events.update}${action}`; 

    const options = {
      mode: 'cors',
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      params: {
        siteUuid: siteUuid
      }
    };

    return this._http.get(url, options).toPromise();
  };

};
