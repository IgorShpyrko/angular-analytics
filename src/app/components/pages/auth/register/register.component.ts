import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MzToastService } from 'ngx-materialize';

import { RegisterService } from 'src/app/common/services/register/register.service';
import { TokenService } from 'src/app/common/services/token/token.service';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { emailRegex, passRegex } from 'src/app/common/constants/regExps';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _registerService: RegisterService,
    private _tokenService: TokenService,
    private _authService: AuthService,
    private _router: Router,
    private _toastService: MzToastService) { }

    profileForm: FormGroup;
    submitClicked: boolean = false;
    submitted: boolean = false;
    passwordFormGroup: FormGroup;

  ngOnInit() {
    this.submitClicked = false;
    this.profileForm = this.fb.group({
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      lastName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      email: ['', [
        Validators.required,
        Validators.pattern(emailRegex)
      ]]
    });

    this.passwordFormGroup = this.fb.group(
      {
        password: ['', Validators.compose([Validators.required, Validators.pattern(passRegex)])],
        repeatPassword: ['', Validators.required]
      },
      {
        validator:  (profileForm: FormGroup) => {
          const password = profileForm.controls.password.value;
          const repeatPassword = profileForm.controls.repeatPassword.value;
  
          if (repeatPassword.length <= 0) {
            return null;
          }
  
          if (repeatPassword !== password) {
            return {
              doesMatchPassword: true
            };
          }
          return null;
        }
      }
    );
  }

  onClickSubmitBtn() {
    // this.submitClicked = true
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    // this.submitted = true;

    // TODO: Use EventEmitter with form value

    const newUser = Object.assign(
      {},
      this.profileForm.value,
      {password: this.passwordFormGroup.value.password}
    );

    this._registerService.register(newUser)
      .then( 
        (response: {accessToken: string, refreshToken: string}): void => {
          this._tokenService.setAll(response);
          this._authService.changeIsLoggedIn(true);
          this._router.navigate(['/'], {});
          console.log('response', response)
        })
      .catch(
        error => {
          console.log('error :', error);
          if (error.status === 403) {
            this._toastService.show(error.error, 4000, 'red')
          }
        }
      )
  }

}
