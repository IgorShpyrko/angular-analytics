import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RegisterService } from '../../../../services/register/register.service';

const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

// At least one upper case English letter, (?=.*?[A-Z])
// At least one lower case English letter, (?=.*?[a-z])
// At least one digit, (?=.*?[0-9])
// At least one special character, (?=.*?[#?!@$%^&*-])
// Minimum eight in length .{8,} (with the anchors)
const passRegex = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _registerService: RegisterService) { }
    
    profileForm: FormGroup;
    submitClicked:boolean = false;
    submitted:boolean = false;
    response;
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
          let password = profileForm.controls.password.value;
          let repeatPassword = profileForm.controls.repeatPassword.value;
  
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
    this.submitClicked = true
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // TODO: Use EventEmitter with form value

    let newUser = Object.assign(
      {},
      this.profileForm.value,
      {password: this.passwordFormGroup.value.password}
    )

    this._registerService.register(newUser)
      .subscribe(response => {
        console.log(response)
        this.response = response
      })
  }

}
