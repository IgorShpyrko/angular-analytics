import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MzToastService } from 'ngx-materialize';

import { TokenService } from 'src/app/core/services/token/token.service';
import { CustomerService } from 'src/app/core/services/customer/customer.service';
import { emailRegex, passRegex } from 'src/app/core/constants/regExps';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _tokenService: TokenService,
    private _customerService: CustomerService,
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

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    
    // TODO: Use EventEmitter with form value
    
    const newUser = Object.assign(
      {},
      this.profileForm.value,
      { login: this.profileForm.value.firstName },
      { password: this.passwordFormGroup.value.password }
    );
      
    this._customerService.register(newUser)
      .then( 
        (response: { token: string }): void => {
          this._tokenService.setAccessToken(response.token);
          this._customerService.changeIsLoggedIn(true);
          this._router.navigate(['/'], {});
        })
      .catch(error => {
        console.log('error :', error);
        if (error.status === 403) {
          this._toastService.show(error.error, 4000, 'red')
        }
      })
  }

}
