import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CustomerService } from '../services/customer/customer.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _customerService: CustomerService
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this._customerService.logout();
        location.reload(true);
        const error = err.error.message || err.statusText
  
        return throwError(error)
      } else {
        return throwError(err)
      }
    }))
  } 
}
