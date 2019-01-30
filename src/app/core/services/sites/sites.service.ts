import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import API from 'src/app/core/constants';
import { CommonService } from 'src/app/core/services/common/common.service';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  constructor(
    private _http: HttpClient,
    private _commonService: CommonService
  ) {}

  add(name: string) {
    const url = `${API.serverUrl}${API.sites.add}`;

    const body = {
      name: this._commonService.prepareSiteName(name)
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      body: body
    };

    return this._http.post(url, body, options).toPromise();
  };

  getAll() {
    const url = `${API.serverUrl}${API.sites.getAll}`;

    const options = {
      mode: 'cors',
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this._http.get(url, options).toPromise();
  };

  update(uuid: any, newSite: any) {
    const url = `${API.serverUrl}${API.sites.update}`;

    const body = {
      name: newSite,
      uuid: uuid  
    };

    const options = {
      mode: 'cors',
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      body: body
    };

    return this._http.put(url, body, options).toPromise();
  };
  
  delete(uuid: string) {
    const url = `${API.serverUrl}${API.sites.delete}`;

    const params = {
      uuid: uuid
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
