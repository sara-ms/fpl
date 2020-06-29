import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const AUTH_API = 'http://localhost:9000/user/all/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthServiceService {
    saveUserURL = "localhost:9000/user/add";
  loginURL: string = "localhost:9000/user/authenticate";
    constructor(private http: HttpClient) { }

    // login(username: string, password: string) {
    //     return this.http.post<any>(`/user/authenticate`, { username: username, password: password })
    //         .pipe(map(user => {
    //             // login successful if there's a jwt token in the response
    //             if (user && user.token) {
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify(user));
    //             }

    //             return user;
    //         }));
    // }
    register(user): Observable<any> {
        return this.http.post(this.saveUserURL, {
          username: user.username,
          nom: user.email,
          password: user.password
        }, httpOptions);
      }
    
      login(credentials): Observable<any> {
        return this.http.post(this.loginURL, {
          username: credentials.username,
          password: credentials.password
        }, httpOptions);
      }
    





    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}

