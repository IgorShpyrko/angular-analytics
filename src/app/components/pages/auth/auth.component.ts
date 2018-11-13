import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  onCloseModal(e) {
    e.preventDefault()
    e.stopPropagation();
    
    if (e.target.className === 'auth-wrapper') {
      this._router.navigate(['/'], {});
    }
  }
}
