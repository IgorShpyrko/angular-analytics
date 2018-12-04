import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { API } from 'src/app/common/constants/';
import { Router } from '@angular/router';

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
    private _router: Router) { }

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
        (user: {email: string, token: string}): void => {
          this._tokenService.set(user.token);
          this._authService.changeIsLoggedIn(true);
          this._router.navigate(['/analize'], {});
          return
        },
        error => {
          console.log(error)
        }
      )
  }
}
