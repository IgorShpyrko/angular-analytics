import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from '../../constants/';
import { TokenService } from 'src/app/common/services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  constructor(
    private _http: HttpClient,
    private _tokenService: TokenService) { };

  private token: string = this._tokenService.getAccessToken();

  private headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });

  private bodyParams = {
    mode: 'cors',
    headers: this.headers
  };

  async getSiteActions(siteUUID, event) {
    if (!this.token) { return };

    const url = `${API.serverAPI.serverUrl}${API.serverAPI.events}/${event}/${siteUUID}`;
    console.log(url)
    try {
      return this._http.get(url, this.bodyParams).toPromise();
    }
    catch (err) {
      console.log(err);
    }
  };

  async getAllActionsList() {
    const url = `${API.serverAPI.serverUrl}${API.serverAPI.events}${API.serverAPI.allTypes}`;

    try {
      return this._http.get(url).toPromise();
    }
    catch (err) {
      console.log(err);
    }
  };

  async getSubmitedActionsList(uuid) {
    const url = `${API.serverAPI.serverUrl}${API.serverAPI.events}${API.serverAPI.attach}/${uuid}`;

    try {
      return this._http.get(url).toPromise();
    }
    catch (err) {
      console.log(err);
    }
  };

}
