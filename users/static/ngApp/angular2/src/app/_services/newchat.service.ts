import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Constants } from '../_store/constants'
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/user';
import { PubNubAngular } from 'pubnub-angular2';
import { DashboardComponent } from '../protected/dashboard/dashboard.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { rootReducer, IAppState } from '../_store/store';
import { MatSnackBar } from '@angular/material';
import * as ChatEngineCore from 'chat-engine';


@Injectable()
export class NewchatService {
    username: string;
    fullName: string;
    ChatEngine:any;
    room: string = 'chatengine-demo-room';

    constructor(
    ) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.user.username;
        this.fullName = currentUser.user.first_name + ' ' + currentUser.user.last_name;
    }

    callStack = () => {
        this.initialize();
        this.lobby();
        this.subscribe();
        
    }
    
    initialize = () => {
        this.ChatEngine = ChatEngineCore.create({
            publishKey: '#',
            subscribeKey: '#'
        });
    }

    lobby = () => {
        this.ChatEngine.connect(String(new Date().getTime()), {
            nickName: this.username
        });

        this.ChatEngine.on('$.ready', (data) => {
            let me = data.me;

            console.log("Ready to Go");
            
        });
        
    }

    subscribe = (channel="") => {
        let myChat = new (this.ChatEngine).Chat('chatengine-demo-room');

        myChat.on('message', (message) => {
            console.log("Message Received");
        });
    }

    publish = (message="") => {
            // store my new user as `me`
            console.log("In Publish");
            // create a new ChatEngine Chat
            let myChat = new (this.ChatEngine).Chat(this.room);

           
            myChat.emit('message', {
                text: message
            });

            console.log("Message Sent");
            
    }
        
    

} 