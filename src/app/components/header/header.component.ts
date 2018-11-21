import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private _loginService: LoginService,
    private _router: Router) { };
    
  loggedIn:boolean;

  ngOnInit() {
    this._loginService.isLoggedIn.subscribe((res) => {
      this.loggedIn = res;
    })
  }

  onLogOut() {
    this._loginService.logout();
    this._router.navigate(['/'], {});
  }
}
