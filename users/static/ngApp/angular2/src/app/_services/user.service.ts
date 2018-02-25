import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from '../_models/user';
 
@Injectable()
export class UserService {
    headers: Headers;
    options: RequestOptions;
    currentUser: any;

    constructor(private http: Http) {
        this.options = new RequestOptions ();
        if (this.options.headers == null) {
            this.options.headers = new Headers();
        }

        this.options.headers.append('Content-Type', 'application/json');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.options.headers.append('Authorization','JWT ' + this.currentUser.token);
    }
    

    getAll() {
        return this.http.get('/users').map((response: Response) => response.json());
    }
 
    getUserName():String {
        return this.currentUser.user.first_name +' '+ this.currentUser.user.last_name
    }
 
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

    getDirectChannelDetails = (id=undefined) => { 
        if (! id) {
            id = this.currentUser.user.pk      
        }      
        return this.http
            .get(`/api/user-channels/${ id }`, this.options)
            .map((response: Response) => response.json());
    }

    addDirectChannelDetails = (friendId, channelName) => {
        let id = null;
        if (!id) {
            id = this.currentUser.user.pk
        }
        let body = {
            
            "user": id,
            "friend" : [
                { "user": friendId, "channel": channelName }
            ],
            "isDirect": true
            
        }
        return this.http
            .post(`/api/user-channels/`, body , this.options)
            .map((response: Response) => response.json());
    }

    addPublicPrivateChannel = (channelName, displayName, userId=null, isPrivate=false) => {
        if (!userId) {
            userId = this.currentUser.user.pk
        }
        let body = {            
            "users" : [
                { "user": userId, "isAdmin": true }
            ],
            "channel": channelName,
            "createdBy": userId,
            "isPrivate": isPrivate,
            "displayName": displayName
        }
        return this.http
            .post(`/api/all-channels/`, body , this.options)
            .map((response: Response) => response.json());
    }

    getChannelName = () => {
        return this.http
            .get(`/api/channel-name`, this.options)
            .map((response: Response) => response.json());
    }

    getUserDetails = (name: string, param='username') => {
        return this.http
            .get(`api/user-details/?${param}=${ name}`, this.options)
            .map((response: Response) => response.json());
    }
    getUserAllChannels = (userId: string = undefined) => {
        // if (!userId) {
        //     userId = this.currentUser.user.pk
        // }     
        return this.http
            .get(`api/all-channels/`, this.options)
            .map((response: Response) => response.json());
    }
}