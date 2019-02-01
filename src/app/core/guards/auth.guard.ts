import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token/token.service';
import { MzToastService } from 'ngx-materialize';
import { CustomerService } from '../services/customer/customer.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor (
    private router: Router,
    private _tokenService: TokenService,
    private _toastService: MzToastService,
    private _customerService: CustomerService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this._tokenService.getAccessToken()) {
        if (!this._tokenService.isExpiredAccessToken()) {
          return true
        } else {
          const message = 'token is expired'
          this._toastService.show(message, 4000, 'red', () => {});
          this._customerService.logout();
          return false;
        }
      } else {
        const message = 'no token provided'
        this._toastService.show(message, 4000, 'red', () => {});
        this._customerService.logout();
        return false;
      }
    }
}
