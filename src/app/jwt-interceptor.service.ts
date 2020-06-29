
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

import { AuthServiceService } from './auth-service.service';
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private authenticationService: AuthServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // add authorization header with jwt token if available
      let currentUser = this.authenticationService.currentUserValue;
      if (currentUser && currentUser.token) {
          request = request.clone({
               setHeaders: { 
                  Authorization: `Bearer ${currentUser.token}`
               }
           });
       }

      return next.handle(request);
  }


signOut() {
  window.sessionStorage.clear();
}

public saveToken(token: string) {
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY, token);
}

public getToken(): string {
  return sessionStorage.getItem(TOKEN_KEY);

}
public saveUser(user) {
  window.sessionStorage.removeItem(USER_KEY);
  window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

public getUser() {
  return JSON.parse(sessionStorage.getItem(USER_KEY));
}
}

