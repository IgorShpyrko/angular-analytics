import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/common/services/auth/auth.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import * as API from 'src/app/common/constants/api';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _tokenService: TokenService
    ) {}
  private _accessToken: string;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === `${API.serverAPI.serverUrl}${API.serverAPI.refreshToken}`) {
      return next.handle(req)
    };

    if (!this._tokenService.getAccessToken()) {
      return next.handle(req)
    };

    if (this._tokenService.getAccessToken()) {
      if (this._tokenService.isExpiredAccessToken()) {
        if (this._tokenService.getRefreshToken()) {
          if(!this._tokenService.isExpiredRefreshToken()) {
            this._tokenService.refreshToken()
              .then(
                res => {
                  if (this._tokenService.getAccessToken()) {
                    if (!this._tokenService.isExpiredAccessToken()) {
                      this._accessToken = this._tokenService.getAccessToken();

                      const clonedRequest = req.clone({
                        headers: req.headers.set('Authorization', 'Bearer ' + this._accessToken)
                      });

                      return next.handle(clonedRequest);
                    }
                  }
                },
                err => {
                  return next.handle(req)
                }
              )
          } else {
            this._authService.logout()
            return next.handle(req)
          }
        } else {
          return next.handle(req)
        }
      } else {
        this._accessToken = this._tokenService.getAccessToken();

        const clonedRequest = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + this._accessToken)
        });

        return next.handle(clonedRequest)
      }
    }
  }
}
