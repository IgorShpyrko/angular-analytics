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

      if (!this._tokenService.get()) {
        this.router.navigate(['/auth/login'], {});
        this._authService.changeIsLoggedIn(false);
        return false;
      } else {
        this._authService.changeIsLoggedIn(!this._tokenService.isTokenExpired());
        return !this._tokenService.isTokenExpired()
      }


  }
}
