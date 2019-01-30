import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../core/services/customer/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private _customerService: CustomerService,
    private _router: Router) { }
  loggedIn: boolean;

  ngOnInit() {
    this._customerService.isLoggedIn.subscribe(
      res => {
        this.loggedIn = res;
      },
      err => {
        this.loggedIn = false;
      }
    )
  };

  onLogOut() {
    this._customerService.logout();
    this._router.navigate(['/'], {});
  };
};
