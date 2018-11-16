import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _loginService: LoginService) { }

  user;

  profileForm = this.fb.group({
    name: ['', Validators.compose([
      Validators.required,
      Validators.minLength(6)
    ])],
    password: ['', [
      Validators.required
    ]],
  });

  ngOnInit() {
  }

  get f() {
    return this.profileForm.controls;
  }

  onLogin() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);
    this._loginService.login(this.profileForm.value.name)
      .subscribe(user => {
        this.user = user
        window.localStorage.setItem('token', user['token'])
      })
  }
}
