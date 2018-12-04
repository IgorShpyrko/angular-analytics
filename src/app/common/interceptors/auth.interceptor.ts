import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth/auth.service';
import { TokenService } from '../services/token/token.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _tokenService: TokenService
    ) {}
  private _token: string;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._token = window.localStorage.getItem('token');

    if (!this._token) {
      this._authService.changeIsLoggedIn(false)
      return next.handle(req)
    }

    if (this._token && !this._tokenService.isTokenExpired()) {

      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this._token)
      })
      return next.handle(clonedRequest)
    }

  }
}
