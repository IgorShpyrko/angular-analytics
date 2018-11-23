import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../../services/login/login.service';
import { TokenService } from '../../../../services/token/token.service';
import { emailRegex } from '../../../../constants/regExps';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService,
    private _tokenService: TokenService,
    private _router: Router) { }

  profileForm = this.fb.group({
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern(emailRegex)
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
    // TODO: Use EventEmitter with form value
    this._loginService.login(this.profileForm.value)
      .subscribe(
        (user: {email: string, token: string}): void => {
          this._tokenService.set(user.token);
          this._loginService.changeIsLoggedIn(true);
          this._router.navigate(['/analize'], {});
          return
        },
        error => {
          console.log(error)
        }
      )
  }
}
