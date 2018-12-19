import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { TokenService } from '../services/token/token.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _authService: AuthService,
    private _tokenService: TokenService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this._tokenService.getAccessToken()) {
        if (!this._tokenService.isExpiredAccessToken()) {
          return true
        } else if (this._tokenService.getRefreshToken()) {
          if (!this._tokenService.isExpiredRefreshToken()) {
            this._tokenService.refreshToken()
              .then(() => {
                return this._tokenService.isExpiredAccessToken()
              })
          }
        }
      } 
    }
}
