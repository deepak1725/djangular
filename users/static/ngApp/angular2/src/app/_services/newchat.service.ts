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
import { UserService } from './user.service';
import { concat } from 'rxjs/operator/concat';


@Injectable()
export class NewchatService {
    username: string;
    fullName: string;
    ChatEngine:any;
    // room: string = 'general';
    rooms: Array<any> = ['general', 'annoucement']; 
    privateRooms: Array<any> = [];
    currentChatObject:any;
    currentChat:any;
    basicRooms:any;
    // allUsers: any = [];
    globalChannel:string = 'NewKey'
    me:any;
    channelInput: string = this.route.snapshot.paramMap.get('channel');
    myPrivateChannels: Array<any> = []

    @select(['public_channel','payload']) readonly publicChats$: Observable<any[]>;
    @select(['private_channel','payload']) readonly privateChats$: Observable<any[]>;
    @select(['direct_channel','payload']) readonly directChats$: Observable<any[]>;
    @select(['users','payload']) readonly users$: Observable<any[]>;
    @select(['current_channel','payload']) readonly currentChannel$: Observable<any>;
    @select(['message','payload']) readonly messages$: Observable<any[]>;

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private route: ActivatedRoute,
        private UserServicee: UserService,
    ) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.user.username;
        this.fullName = currentUser.user.first_name + ' ' + currentUser.user.last_name;
    }

    callStack = () => {
        this.UserServicee.getUserChannelDetails().subscribe(
            (response) => {
                this.myPrivateChannels = response.data.friend
                this.initialize();
                this.lobby();
                // this.ngRedux.dispatch({ type: Constants.USERADD, payload: response.data.friend })
            },
            (error) => {
                console.log("Error")
            }
        )
        
    }
    
    initialize = () => {
        this.ChatEngine = ChatEngineCore.create({
            publishKey: environment.PUBNUB_PUB_KEY,
            subscribeKey: environment.PUBNUB_SUB_KEY,
        },{
            globalChannel: this.globalChannel
        });   
    }

    createChat = (channel = this.currentChat, isPrivate= false) => {
        let chat = this.ChatEngine.Chat(channel, isPrivate);
        return chat;
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
            
            this.rooms.forEach(room => {
                this.createRoom(room);
            });
            // this.updateChatObject();
            
            this.publicChannelListing()
            this.eventListerners()
        });
    }

    createRoom = (room, isPrivate=false) => {
        
        this.basicRooms = new (this.ChatEngine).Chat(room, isPrivate);
        
        // if (this.isChannelCurrent(room)) {
        //     this.currentChatObject = this.basicRooms;
        // }
        // this.subscribe(this.basicRooms)   
    }

    subscribe = (basicRoom) => {

        basicRoom.on('message', (payload) => {
            this.renderMessage(payload)
        });
    }

   

    history = (currentChatObject) => {
        // wait for our chat to connect
        this.ngRedux.dispatch({ type: Constants.MESSAGEREMOVE, payload: {} })        
        
            currentChatObject.search({
                reverse: true,
                event: 'message',
                limit: 50
            }).on('message', (data) => {
                this.renderMessage(data);

            });   
    }

    renderMessage = (payload) => {
        
        let newData = {
            channel: this.channelInput,
            data: payload.data,
            sender: payload.sender
        }
        this.ngRedux.dispatch({ type: Constants.MESSAGEADD, message: newData })
    }

    eventListerners = () => {
        this.ChatEngine.on('$.created.chat', (data, chat) => {
            
            this.fetchChannel(chat.channel);
        });

        (this.me).direct.on('message', (payload) => {
            console.log(payload.sender.uuid, 'sent your a game invite on the map', payload.data.map);
        });

        this.ChatEngine.on('$.created.user', (data, user) => {
            
            Observable.forkJoin(
                this.UserServicee.getUserDetails(user.uuid),
                this.UserServicee.getChannelName()
                ).subscribe(resp => {
                    console.log("Get User Service response", resp[0])
                    return this.UserServicee.addUserChannelDetails(resp[0].data.id, resp[1].data.name)
                        .subscribe((response) => {
                            let channelName = response.data.friend[0].channel
                            let newChat = new (this.ChatEngine).Chat(channelName, true);
                        })
            })


            this.UserServicee.getUserChannelDetails().subscribe((response) => {
                for (const key in response.data.friend) {
                    if (response.data.friend.hasOwnProperty(key)) {
                        const element = response.data.friend[key];
                        this.sendInvite(element.username, element.channel);
                    }
                }
                this.ngRedux.dispatch({ type: Constants.USERADD, payload: response.data.friend })    

            })

            
        });

        this.me.direct.on('$.invite', (payload) => {
            console.log("You got annn Invite", payload);
            // this.subscribe();
        });

        // this.currentChatObject.on('$.online.*', (data) => {
        //     // this.allUsers.push(data.user);
        // });

        // (this.currentChatObject).on('$.offline.*', (data) => {
        //     console.log("SomeOne got offline");
        // });


        this.currentChannel$.subscribe(
            (channel) => {
                this.currentChat = channel;

                let chatObject = this.createChat(channel);
                this.subscribe(chatObject);   
                this.history(chatObject) 
            },(error) => {
                console.log("Error in current channel", error)
            })            
    }

    updateUserState = (me) => {
        me.update({
            lastOnline: new Date(),
            nickName: this.username,
            fullName: this.fullName
        });
    }


    publishDirectMessage = (uuid) => {
            let receiver = new (this.ChatEngine).User(uuid);            
            receiver.direct.emit('message', { map: 'de_dust' });
    }

   

    publicChannelListing = () => {
        
        let allChannels = this.ChatEngine.chats
        for (let element in allChannels) {
            this.fetchChannel(element);
        }
        
    }

    fetchChannel = (element) => {
        let chat = element.split("#");
        let isCurrentChannel = this.isChannelCurrent(chat[3]);
        let currentChatRoom = null;
        
        if ((this.ChatEngine.chats).hasOwnProperty(element)) {
            currentChatRoom = this.ChatEngine.chats[element];
        }

        if (chat[2] == 'public.') {
            this.ngRedux.dispatch({ type: Constants.PUBLICCHANNELADD, payload: chat[3] })
        }

        if (chat[2] == 'private.') {
            let userDetails = this.myPrivateChannels.find((arg):any => arg.channel == chat[3] )
            if (userDetails) {        
                let payload = {
                    channel: chat[3],
                    uuid: userDetails.username,
                    firstName : userDetails.first_name,
                    lastName : userDetails.last_name,
                }
                this.ngRedux.dispatch({ type: Constants.PRIVATECHANNELADD, payload: element })    
            }
            
        }


        if (isCurrentChannel && currentChatRoom) { //Checking Current Channel
            
            this.ngRedux.dispatch({ type: Constants.CURRENTCHANNELADD, payload: element })    
        }
    }

    isChannelCurrent = (channel) => {
        if (channel == this.channelInput) {
            return true;
        }
        return false;
    }

    shiftChannel = (channel: string, isPrivate: boolean) => {

        let chat = this.createChat(channel, isPrivate); 
        // if (isPrivate) {
            // this.subscribe(channelAdd);
            // this.history(channelAdd);
        // }
        this.ngRedux.dispatch({ type: Constants.CURRENTCHANNELADD, payload: chat.channel })    

    }


    sendInvite = (invitedUuid, room) => {

        let user = this.ChatEngine.User(invitedUuid);
        let chat = this.createChat(room, true);
        chat.invite(user);
        console.log("You sent an Invite",user);
        return room;

    }

    publish = (message="") => {
        
        let chat = this.createChat();
        chat.emit('message', {
            text: message,
            nickName: this.username,
            fullName: this.fullName,
            date: new Date()
        });
    }

    global = () => {
        this.ChatEngine.global.on('$.state', (payload) => {
            console.log(payload.user + ' updated state: ' + payload.state);
        });
    }
        
    

} 