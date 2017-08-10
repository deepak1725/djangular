import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from '../_models/user';
 
@Injectable()
export class UserService {
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http) {
        this.options = new RequestOptions ();
        if (this.options.headers == null) {
            this.options.headers = new Headers();
        }

        this.options.headers.append('Content-Type', 'application/json');
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.options.headers.append('Authorization','JWT ' + currentUser.token);
        //  let headers = new Headers();
        // headers.append('Authorisation', 'ds');

        console.log("In COnstructor");
        console.log(this.options);
     }
 
    getAll() {
        return this.http.get('/users').map((response: Response) => response.json());
    }
 
    // getById(_id: string) {
    //     return this.http.get('/users/' + _id).map((response: Response) => response.json());
    // }
 
    create(user: User) {
        return this.http.post('/users/register', user);
    }
 
    // update(user: User) {
    //     return this.http.put('/users/' + user._id, user);
    // }
 
    // delete(_id: string) {
    //     return this.http.delete('/users/' + _id);
    // }

    getAllUsers(){
        return this.http.get(
            'api/users',
            this.options
        )
        .map((response: Response) => {
            var apiresponse = JSON.stringify(response);
            return apiresponse;
        });
    }
}