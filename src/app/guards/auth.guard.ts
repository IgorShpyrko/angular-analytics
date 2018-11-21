import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _loginService: LoginService) {
    (() => { this._loginService.isLoggedIn.subscribe((res: boolean):void => { this.check = res }) })()
    }

  private check: boolean;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.check) {
        return true
      } else {
        this.router.navigate(['/'], {});
        return false;
      }
  }
}
