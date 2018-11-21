import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  private _token:string = window.localStorage.getItem('token');
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

    if (!this._token) {
      return next.handle(req)
    }

    if (this._token) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this._token)
      })
      
      return next.handle(clonedRequest)
    }

  }
}