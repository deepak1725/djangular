import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { HttpHeaders } from '@angular/common/http';
// import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';


@Injectable()
export class AuthenticationService {
    

    constructor(
        private http: Http,
        private router: Router
    ) { }
    
    // private beforeRequest(): void {
    // this.notifyService.showPreloader();
    // }

    // private afterRequest(): void {
    // this.notifyService.hidePreloader();
    // }
    isLoggedIn = false;
    redirectUrl: string;

    login(username: string, password: string) {
        return this.http.post(
                '/api/login/', 
                { username: username, password: password } 
        )
        .map((response: Response) => {
            this.isLoggedIn = true;
            let user = response.json();
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            this.router.navigate(['dashboardd']);
            if (this.redirectUrl) {
                this.router.navigate([this.redirectUrl]);
            }
            return user;
        });
    }

    
 
    logout() {
        return this.http.post(
            '/api/register/',
            { }
        )
        .map((response: Response) => {
            // remove user from local storage to log user out
                localStorage.removeItem('currentUser');
                this.isLoggedIn = false;
                this.router.navigate(['login']);                    
        });
    }

    register(userInputs) {
        return this.http.post(
                '/api/register/', 
                userInputs,
        )
        .map((response: Response) => {
            let user = response.json();
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        });
    }
    

    forgotPassword(userInputs) {
        return this.http.post(
                '/api/reset-password/', 
                userInputs
        )
        .map((response: Response) => {
            let user = response.json();

            return user;
        });
    }
    
    options: RequestOptionsArgs; //For AuthHeader
    headers: Headers;
    
    getAuthHeader(){
        this.options = new RequestOptions ();
        if (this.options.headers == null) {
            this.options.headers = new Headers();
        }
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new Headers({'Authorization':'JWT ' + currentUser.token});
    }

    changePassword(userInputs){
        this.getAuthHeader()
        return this.http.post(
            '/api/change-password',
            userInputs,
            {headers: this.headers}
        )
        .map((response: Response) => {
            var responsee = response.json();
            console.log(response);
            return responsee;
        });
    }

    forgotPasswordConfirm(userInputs) {
        return this.http.post(
                '/api/reset/password/confirm', 
                userInputs
        )
       .map((response: Response) => {
            var responsee = response.json();
            console.log("response");
            return responsee;
        })
    }
    
   

}