import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _router: Router) { }
  loggedIn: boolean;

  ngOnInit() {
    this._authService.isLoggedIn.subscribe(
      res => {
        this.loggedIn = res;
      },
      err => {

      }
    )
  }

  onLogOut() {
    this._authService.logout();
    this._router.navigate(['/'], {});
  }
}
