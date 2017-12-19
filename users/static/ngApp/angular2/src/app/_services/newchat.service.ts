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
    me:any;


    constructor(
        private ngRedux: NgRedux<IAppState>
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
            let me = this.me = data.me;
            this.updateUserState(me);
            this.listenDirectMessage(me);
            
            this.myChat = new (this.ChatEngine).Chat(this.room);
            this.subscribe()
            this.getInvite()

        });   
    }

    getInvite = () => {
        this.me.direct.on('$.invite', (payload) => {
            console.log("You got an Invite", payload);
            let secretChat = new (this.ChatEngine).Chat(payload.data.channel);
        });
    }
    
    sendInvite = (invitedUuid) => {
        console.log("InvitedUuid", invitedUuid);
        
        let secretChat = new (this.ChatEngine).Chat(invitedUuid);
        // secretChat.invite(invitedUuid);
        console.log(secretChat);
        console.log("You sent an Invite");
        
    }

    updateUserState = (me) => {
        me.update({
            lastOnline: new Date(),
            nickName: this.username,
            fullName: this.fullName
        });
    }

    listenDirectMessage = (me) => {
        me.direct.on('message', (payload) => {
            console.log(payload.sender.uuid, 'sent your a game invite on the map', payload.data.map);
        });
    }


    publishDirectMessage = (uuid) => {
            let receiver = new (this.ChatEngine).User(uuid);            
            receiver.direct.emit('message', { map: 'de_dust' });
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
            this.myChat.search({
                reverse: true,
                event: 'message',
                limit: 50
            }).on('message', (data) => {
                this.renderMessage(data);
            
            });
        });
        this.onlineUsers();        
    }

    
    onlineUsers = () => {
        let user = this.ChatEngine.users
        console.log('AllUser', user);
        
        (this.myChat).on('$.online.*', (data) => {
            let IndividualChat = new (this.ChatEngine).Chat(data.user.uuid);
            this.allUsers.push(data.user);
        });
        console.log("All Users in Array", Object.keys(user));
        console.log("First User", user[0]);
        
        let allUsers = Object.keys(user);
        this.ngRedux.dispatch({ type: Constants.USERADD, all: [] })
        this.ngRedux.dispatch({ type: Constants.USERADD, all: user })


    }


    offlineUsers = () => {
        (this.myChat).on('$.offline.*', (data) => {
            console.log("SomeOne got offline");
        });
    }

    publish = (message="") => {
          
            (this.myChat).emit('message', {
                text: message,
                nickName: this.username,
                fullName: this.fullName,
                date: new Date()
            });
    }
        
    

} 