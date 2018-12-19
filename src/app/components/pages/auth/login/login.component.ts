import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MzToastService } from 'ngx-materialize';

import { AuthService } from 'src/app/common/services/auth/auth.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { API } from 'src/app/common/constants/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
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
    this._authService.login(this.profileForm.value)
      .subscribe(
        (data: {accessToken: string, refreshToken: string}): void => {
          this._tokenService.setAll(data);
          this._authService.changeIsLoggedIn(true);
          this._router.navigate(['/analize'], {});
        },
        error => {
          if (error.status === 403) {
            this._toastService.show(error.error.message, 4000, 'red')
          }
        }
      )
  }
}
