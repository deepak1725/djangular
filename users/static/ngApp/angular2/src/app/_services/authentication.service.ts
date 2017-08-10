import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class AuthenticationService {
    

    constructor(private http: Http) { }
    
    // private beforeRequest(): void {
    // this.notifyService.showPreloader();
    // }

    // private afterRequest(): void {
    // this.notifyService.hidePreloader();
    // }

    login(username: string, password: string) {
        // this.beforeRequest();
        return this.http.post(
            '/api/get-token/', 
            { username: username, password: password } 
            )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
 
                return user;
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    register(first_name:string, last_name:string, username:string, email: string, password: string) {
        return this.http.post('/api/users/', 
        { first_name: first_name, last_name:last_name, username:username, email:email, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
 
                return user;
            });
    }
    
    
    
    

}