import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from "rxjs/Rx"

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
        if (this.currentUser) {
            this.options.headers.append('Authorization','JWT ' + this.currentUser.token);
        }
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
        })
            .catch(this.handleError);
    }

    getDirectChannelDetails = (id=undefined) => { 
        if (! id) {
            id = this.currentUser.user.pk      
        }      
        return this.http
            .get(`/api/user-channels/${ id }`, this.options)
            .map((response: Response) => response.json())
            .catch (this.handleError);
    }

    addDirectChannelDetails = (friendId, channelName, id=null) => {
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
            .map((response: Response) => response.json())
            .catch(this.handleError);
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
            .map((response: Response) => response.json())
            .catch(this.handleError);      
    }

    editPublicPrivateChannel = (cId, displayName, isPrivate, channel) => {
        let body = {
            "users": [
                { "user": this.currentUser.user.pk,"isAdmin" : false }
            ],
            "displayName": displayName,
            "channel": channel,
            "createdBy": 1, //sending constant as it will have no change in Backend
            "isPrivate": isPrivate,
        }
        console.log(body);
        
        return this.http
            .put(`/api/all-channels/${cId}/?userId=${this.currentUser.user.pk}`, body, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    getChannelName = () => {
        return this.http
            .get(`/api/channel-name`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    getUserDetails = (name: string, param='username') => {
        return this.http
            .get(`api/user-details/?${param}=${ name}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    getUserAllChannels = (userId: string = undefined) => {
        if (!userId) {
            userId = this.currentUser.user.pk
        }
        return this.http
            .get(`api/all-channels/${userId}`, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    getUserStateDetails = (username, friendUserName) => {
        if (username && friendUserName) {            
            return this.http
                .get(`api/user-details/?username=${username}&friendUserName=${friendUserName}`, this.options)
                .map((response: Response) => response.json())
                .catch(this.handleError);
        }

    }
    
    public handleError = (error: Response) => {

        console.log(error, "error2");
        return Observable.throw(error)
    }
}