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

  private mockActionsList: string[] = [
    'click',
    'input',
    'hover'
  ]

  getActions(siteUUID, event) {
    if (!this.token) return;

    const url = `${API.serverUrl}${API.events}/${event}/${siteUUID}`;

    return this._http.get(url, this.bodyParams);
  };

  getSubmitedActionsList(uuid) {
    const url = `${API.serverUrl}${API.events}${API.attach}`;

    return this._http.get(url, {...this.bodyParams, params: { uuid } });
  };

  // get all possible actions from server 
  getActionsList() {

    // TODO: change url to correct
    const url = `${API.serverUrl}${API.events}${API.attach}`;

    this._http.get(url)
    .subscribe(data => {
      console.log(data)
    },
    error => {
      console.log(error)
    })
    
    // TODO: delete mocks
      return this.mockActionsList
  }

};
