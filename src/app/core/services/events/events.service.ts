import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import API from 'src/app/core/constants';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private _http: HttpClient) {}

  get(uuid: string) {
    const url = `${API.serverUrl}${API.events.update}/${uuid}`; 

    const options = {
      mode: 'cors',
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._http.get(url, options).toPromise();
  };

  deleteEvents(uuid: string, eventList: any[]) {
    const url = `${API.serverUrl}${API.events.delete}`;

    const params = {
      siteUuid: uuid,
      events: eventList || []
    };

    const options = {
      mode: 'cors',
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      params: params
    };

    return this._http.delete(url, options).toPromise();
  };
};
