// import { environment } from './../../../../../../../crudapi/my_cdn/ngApp/angular2/src/environments/environment';
import { element } from 'protractor';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Constants } from '../_store/constants'
// import { Observable } from 'rxjs/Observable';
import { User } from '../_models/user';
import { PubNubAngular } from 'pubnub-angular2';
import { DashboardComponent } from '../protected/dashboard/dashboard.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { rootReducer, IAppState } from '../_store/store';
import { MatSnackBar } from '@angular/material';
import * as ChatEngineCore from 'chat-engine';
import { environment } from '../../environments/environment';


@Injectable()
export class NewchatService {
    username: string;
    fullName: string;
    ChatEngine:any;
    room: string = 'fine';
    myChat:any;
    allUsers: any = [];
    message: any = [];
    globalChannel:string = 'Maruti'
    currentChannel: string;

    constructor(
    ) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.user.username;
        this.fullName = currentUser.user.first_name + ' ' + currentUser.user.last_name;
    }

    callStack = () => {
        this.initialize();
        this.lobby();
        
    }
    
    initialize = () => {
        this.ChatEngine = ChatEngineCore.create({
            publishKey: environment.PUBNUB_PUB_KEY,
            subscribeKey: environment.PUBNUB_SUB_KEY,
        },{
                globalChannel: this.globalChannel
        });

        
    }

    lobby = () => {

        
        //Initializing User
        this.ChatEngine.connect(this.username, {
            team: 'red'
        });

        //Setting up Socket
        this.ChatEngine.on('$.ready', (data) => {
            let me = data.me;
            me.update({
                lastOnline: new Date(),
                nickName: this.username,
                fullName: this.fullName
            });
            // this.myOwn = new (this.ChatEngine).User(this.username);            
            this.myChat = new (this.ChatEngine).User(this.username, true);
            this.subscribe()
            console.log("Ready to Go");
            let channel = this.myChat.direct.channel ? '@'+this.username : this.myChat.channel.split(".")[1];
            console.log('channel', channel);
            this.currentChannel = channel;
            // channel = channel.split(".")[1];


        });

        
        
    }

    global = () => {
        this.ChatEngine.global.on('$.state', (payload) => {
            console.log(payload.user + ' updated state: ' + payload.state);
        });
    }

    subscribe = (channel="") => {
            
        (this.myChat).on('message', (payload) => {
            console.log("CE",this.ChatEngine);
            this.renderMessage(payload)
        });

        this.history()
        
    }

    renderMessage = (payload) => {
        this.message.push(payload);        
    }

    history = () => {
        // wait for our chat to connect
        this.myChat.on('$.connected', () => {
            // search for 50 old `message` events
            this.myChat.search({
                reverse: true,
                event: 'message',
                limit: 50
            }).on('message', (data) => {
                // when messages are returned, render them like normal messages
                // renderMessage(data);
                this.message.push(data);
            
                console.log("Chat is connected");
            });
        });
        this.onlineUsers();
        
    }

    onlineUsers = () => {
        
        (this.myChat).on('$.online.*', (data) => {
            console.log('data', data.user);
            this.allUsers.push(data.user);
        });
        console.log(this.ChatEngine.users);
        let allUsers = Object.keys(this.ChatEngine.users);

        // for (let element in allUsers) {
        //     console.log(element);
        // }
        console.log('allasd',allUsers);
        
        console.log('Global', this.ChatEngine);
    }
    offlineUsers = () => {
        (this.myChat).on('$.offline.*', (data) => {
            console.log("SomeOne got offline");
            // $('#people-list ul').find('#' + data.user.uuid).remove();
        });
    }

    publish = (message="") => {
            // store my new user as `me`
            // create a new ChatEngine Chat

           
            (this.myChat).emit('message', {
                text: message,
                date: new Date()
            });

            
    }
        
    

} 