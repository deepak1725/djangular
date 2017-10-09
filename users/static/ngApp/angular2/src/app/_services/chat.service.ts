import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from '../_models/user';
 
@Injectable()
export class ChatService {
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http) {
        this.options = new RequestOptions ();

        if (this.options.headers == null) {
            this.options.headers = new Headers();
        }

        this.options.headers.append('Content-Type', 'application/json');
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            this.options.headers.append('Authorization','JWT ' + currentUser.token);
        }else{
            this.options.headers.append('Authorization','JWT ' + "currentUser.token");

        }

     }
 
    getUuid() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let url = '/api/chat/' + currentUser.user.pk
        return this.http.get(url,this.options)
            .map((response: Response) => { 
                let res = response.json()
                localStorage.setItem('userUuid', JSON.stringify(res.uuid))
                return res.uuid
            }

        );
    }
 
    setUuid() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let user = {
            'user': currentUser.user.pk
        }        
        return this.http.post('/api/chat/', user, this.options)
            .map((response:Response) => response.json())
    }
 

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