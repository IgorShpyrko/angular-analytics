import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder) { }
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


  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);
  }
}
