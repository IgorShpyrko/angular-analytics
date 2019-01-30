import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MzToastService } from 'ngx-materialize';

import { CustomerService } from 'src/app/core/services/customer/customer.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import API from 'src/app/core/constants/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _customerService: CustomerService,
    private _tokenService: TokenService,
    private _router: Router,
    private _toastService: MzToastService) { }

  profileForm = this.fb.group({
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern(API.regExps.emailRegex)
    ])],
    password: ['', [
      Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])
    ]],
  });

  ngOnInit() {
  }

  get f() {
    return this.profileForm.controls;
  }

  onLogin() {
    this._customerService.login(this.profileForm.value)
      .then((data: { token: string }): void => {
        this._tokenService.setAccessToken(data.token);
        this._customerService.changeIsLoggedIn(true);
        this._router.navigate(['/analize'], {});
      })
      .catch(err => {
        if (err.status === 403) {
          this._toastService.show(err.error.message, 4000, 'red')
        }
        if (err.status === 404) {
          this._toastService.show(err.error.message, 4000, 'red')
        }
      })
  }
}
