import { Observable } from 'rxjs/Observable';
import { element } from 'protractor';
import { Injectable, assertPlatform } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Constants } from '../_store/constants'
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
import { log } from 'util';
import { MatSnackBar } from '@angular/material';
import { AuthenticationService } from './authentication.service'

// import 'rxjs/add/operator/switchMap';

@Injectable()
export class NewchatService {
    username: string;
    fullName: string;
    ChatEngine:any;
    currentChatObject:any;
    currentChat:any;
    globalChannel:string = 'Djangular2'
    me:any;
    // onlineGroupUsers = 0;
    channelInput: string = this.route.snapshot.paramMap.get('channel');
    myDirectChannel: Array<any> = []
    myPPChannels: any = [];
    allChannels:any;
    isPrivate:boolean = false;
    subscribedRooms = [];
    currentChatObj :any;
    currentUserData : any;
    noticeData = {
        showNotice: false,
        isMine: false, //IS channel of Self Chat
        message: "d"
    }

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
        private router: Router,
        public snackBar: MatSnackBar,
        private auth: AuthenticationService
        
    ) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.currentUserData = currentUser;
        
        this.username = currentUser.user.username;
        this.fullName = currentUser.user.first_name + ' ' + currentUser.user.last_name;
    }

    callStack = () => {
        this.initialize()
        this.lobby();   
    }
    
    initialize = () => {
        this.ChatEngine = ChatEngineCore.create({
            publishKey: environment.PUBNUB_PUB_KEY,
            subscribeKey: environment.PUBNUB_SUB_KEY,
        },{
            globalChannel: this.globalChannel,
            debug: false
        });   
    }

    createChat = (channel = this.currentChat, isPrivate= false) => {
        let chat = new (this).ChatEngine.Chat(channel, isPrivate);
        return chat;
    }

    getAllChannelDetails = (callback?) => {
        let alldata =  Observable.forkJoin(
            this.UserServicee.getUserAllChannels(),
            this.UserServicee.getDirectChannelDetails());
        
        if (callback && typeof (callback) === "function") {
            callback();
        }
        return alldata;
    }

    lobby = () => {
        
        let allChannels = this.getAllChannelDetails()
        
        //Initializing User
        this.ChatEngine.connect(this.currentUserData.user.username, {
            team: 'red',
            id: this.currentUserData.user.pk,
            fullName: this.currentUserData.user.first_name+" "+this.currentUserData.user.last_name,
            username: this.currentUserData.user.username,
            isOnline: true
        });

        //Setting up Socket
        this.ChatEngine.on('$.ready', (data) => {
            let me = this.me = data.me;
            // this.updateUserState(me);
            this.handleAllChannels(allChannels)
        });
    }

    handleAllChannels = (allChannels, caseOfAddNewChannel = false) => {
        allChannels.subscribe(
            (response) => {

                //Public/Private
                this.myPPChannels = response[0].data
                this.ngRedux.dispatch({ type: Constants.PUBLICCHANNELADD, payload: [] })
                response[0].data.map((element) => {
                    let chatObj = this.createChat(element.channel, element.isPrivate)
                    this.subscribe(chatObj);
                    element.isNewMessageArrived =  false; 
                    return element //TODO
                });

                
                this.ngRedux.dispatch({ type: Constants.PUBLICCHANNELADD, payload: response[0].data })

                if (caseOfAddNewChannel) {
                    return;
                }

                //Direct
                this.myDirectChannel = response[1].data.friend

                response[1].data.friend.map((element) => {
                    let chatObj = this.createChat(element.channel, true)
                    this.subscribe(chatObj);
                    element.isNewMessageArrived = false;
                    element.isOnline = false; 
                   
                });

                this.ngRedux.dispatch({ type: Constants.USERADD, payload: response[1].data.friend })

            },
            (error) => {
                    console.log("Error");                
            },
            () => {
                //Completed        
                this.eventListerners();
                this.publicChannelListing();
        
            }
        )
    }

    subscribe = (chatRoom) => {
        let isAlreadySubscribed = this.subscribedRooms.includes(chatRoom.channel);
        if (!isAlreadySubscribed) {
            this.subscribedRooms.push(chatRoom.channel);
            chatRoom.on('message', (payload) => {
                this.noticeData.showNotice = false
                console.log("A new MEssage is received");
                if (this.currentChat === payload.data.channel ){
                    this.renderMessage(payload.data)
                }else{
                    console.log("A message", payload);
                    
                    let userEditPayload = {
                        'channel': payload.data.channel,
                        'isCurrentChannel': false,
                        'isNewMessageArrived': true
                    }

                    this.ngRedux.dispatch({ type: Constants.USEREDIT, payload: userEditPayload })
                    this.ngRedux.dispatch({ type: Constants.PUBLICCHANNELEDIT, payload: payload.data })
                }
                
            });
        }
    }

    connectChat = (chat) => {
        
        if (chat.hasConnected) {
            this.history(chat)

        }else{
            chat.on('$.connected', () => {
                
                this.history(chat)                
            });
        }
    }

   

    history = (currentChatObject) => {
        
        // wait for our chat to connect
        this.ngRedux.dispatch({ type: Constants.MESSAGEREMOVE, payload: {} })        
        let dataFound = false;

        currentChatObject.search({
            event: 'message',
            limit: 50
        }).on('message', (response) => {
            dataFound = true;
            this.renderMessage(response.data);

        }).on('$.search.finish', () => {
            
            if (dataFound) {
                this.noticeData = {
                    showNotice: false,
                    isMine: false,
                    message: ""
                }

            }else{
                // if length is 0
                
                if (this.currentChat == this.username) {
                    this.noticeData = {
                        showNotice: true,
                        isMine: true,
                        message: "This is your Space! Start typing Anything."
                    }
                } else {
                    this.noticeData = {
                        showNotice: true,
                        isMine: false,
                        message: "This is starting of your conversation. Why not start with a Hello.."
                    }
                }
            }
        });
               
    }

    renderMessage = (payload) => {
        
        let newData = {
            channel: this.channelInput,
            data: payload,
            // sender: payload.sender
        }
        this.ngRedux.dispatch({ type: Constants.MESSAGEADD, newData })
    }


    updateOnlineState = () => {
        // Updating State of All Users
        let allOnlineUsers = this.ChatEngine.global.users;

        let clearStatePayload = {
            'clearState': true,
            'state': {},
        }
        this.ngRedux.dispatch({ type: Constants.USEREDIT, payload: clearStatePayload })

        for (const user in allOnlineUsers) {

            if (allOnlineUsers.hasOwnProperty(user)) {

                const element = allOnlineUsers[user];

                let userEditPayload = {
                    'channel': element.uuid,
                    'state': element.state,
                }

                this.ngRedux.dispatch({ type: Constants.USEREDIT, payload: userEditPayload })
            }
        }
    }

    eventListerners = () => {

        this.ChatEngine.on('$.state', (payload) => {
            
            this.updateOnlineState()
            
        });

        this.ChatEngine.on('$.created.chat', (data, chat) => {
            // this.fetchChannel(chat.channel);
        });

        (this.me).direct.on('message', (payload) => {
            console.log(payload.sender.uuid, 'sent your a game invite on the map', payload.data.map);
        });

        this.ChatEngine.on('$.created.user', (data, user) => {
            this.manageDirectChannels(user)
        });

        this.ChatEngine.on('$.offline.*', (data, user) => {
            this.updateOnlineState()
            
        });

        this.me.direct.on('$.invite', (payload) => {
            // console.log("You got annn Invite", payload);
        });

        // this.currentChatObject.on('$.online.*', (data) => {
        //     // this.allUsers.push(data.user);
        // });

        // (this.currentChatObject).on('$.offline.*', (data) => {
        //     console.log("SomeOne got offline");
        // });

        this.currentChannel$.subscribe(
             (payload) => {

                if (payload && payload.channel) {
                    this.currentChat = payload.channel;
                    this.currentChatObj = payload;
                    let chatObject = this.createChat(payload.channel, payload.isPrivate);

                    if (chatObject) {
                        this.subscribe(chatObject);
                        this.connectChat(chatObject);   
                    }
                } 
            },(error) => {
                console.log("Error in current channel", error)
            }
        )            
    }

    manageDirectChannels = (user) => {

        let userDetails = Observable.forkJoin(
            this.UserServicee.getUserDetails(user.uuid),
            this.UserServicee.getChannelName()); //getting unique channel name

        userDetails.switchMap((res) => {
            return this.UserServicee.addDirectChannelDetails(res[0].data.id, res[1].data.name)
        }).subscribe((response) => {
            this.myDirectChannel = response.data.friend

            for (const friend in response.data.friend) {
                if (response.data.friend.hasOwnProperty(friend)) {
                    const element = response.data.friend[friend];
                    this.sendInvite(element.username, element.channel);
                }
            }
            

            this.ngRedux.dispatch({ type: Constants.USERADD, payload: response.data.friend })
        })    
    }

    // getChatObj = (channel, isPrivate=false) => {
    //     let chat = new (this).ChatEngine.Chat(channel, isPrivate);
    //     let darshan = Promise.resolve(chat.users);
    //     // let res = new Promise((resolve, reject) => {
    //     //                 return chat;
    //     //             });
    //     return darshan;
    // }

    updateUserState = (me) => {
        console.log("Update state");
        
        me.update({
            lastOnline: new Date(),
            nickName: this.username,
            fullName: this.fullName
        });
    }

    getUserFriendChannel = (friendUserName) => {
        if (friendUserName) {
            let result = this.UserServicee.getUserStateDetails(this.username, friendUserName);
            return result.toPromise();
        }
    }


    // publishDirectMessage = (uuid) => {
    //         let receiver = new (this.ChatEngine).User(uuid);            
    //         receiver.direct.emit('message', { map: 'de_dust' });
    // }

   

    publicChannelListing = () => {
        this.isChannelCurrent()
        // let allChannels = this.ChatEngine.chats
        // this.myDirectChannel.forEach(element => {
            // console.log("element", element);
            this.fetchChannel();
            
        // }); 
        
        
    }

    // This will fetch details from API records and add them to redux for rendering

    fetchChannel = (chatElement="") => {
        // let chat = element.split("#");
        let currentChatRoom = null;

        for (let element of this.myDirectChannel){
            // this.fetchChannel(element, true);
            // console.log(element);
            // let userDetails = this.myDirectChannel.find((arg):any => arg.channel == chat[3] )
            // if (userDetails) {
                let payload = {
                    channel: element.channel,
                    uuid: element.username,
                    firstName : element.first_name,
                    lastName : element.last_name,
                }
                this.ngRedux.dispatch({ type: Constants.PRIVATECHANNELADD, payload: element })    
            // }   
            
        }
    }

    // chatUser = (chat) => {
    //     return new Promise((resolve, reject) => {
    //         resolve(Object.keys(chat.users));
    //     })
    // }
    // Input: Current Opened Channel or CHannel we tried to shift into
    isChannelCurrent = (channelInput = undefined) => {
        if(! channelInput){
            channelInput= this.route.snapshot.paramMap.get('channel');
        }
        let displayName: string= undefined; 
        let ppElement = this.myPPChannels.find((element) => element.channel == channelInput)
        let directElement = this.myDirectChannel.find((element) => element.channel == channelInput)

        if (ppElement) {
            this.isPrivate = ppElement.isPrivate;
            //If Channel we tried to shift into is Public/Private Channel
            displayName = '#' + ppElement.displayName;
            let chat = this.createChat(ppElement.channel);
            
            
            let payload = {
                'channel': ppElement.channel,
                'isPrivate': ppElement.isPrivate,
                'displayName': displayName,
                'isDirect': false,
                'chatusers': Object.keys(chat.users),
                'cId' : ppElement.id
            }
            //REMOVING NEW MESSAGE INDICATOR
            let ppChannelEditPayload = { 'channel': ppElement.channel, 'isCurrentChannel' : true};
            this.ngRedux.dispatch({ type: Constants.PUBLICCHANNELEDIT, payload: ppChannelEditPayload })

            this.ngRedux.dispatch({ type: Constants.CURRENTCHANNELADD, payload: payload })
        }
        else if(directElement){
            this.isPrivate = true;
            let chat = this.createChat(directElement.channel);
            
            //If Channel we tried to shift into is Direct Channel
            displayName = '@' + directElement.username;

            let payload = {
                'channel': directElement.channel,
                'isPrivate': true,
                'displayName': displayName,
                'isDirect' : true,
                'chatusers': Object.keys(chat.users),
                'cId': null
                
            }
            //REMOVING NEW MESSAGE INDICATOR
            // console.log(Object.keys(chat.users))
            
            let userEditPayload = { 
                'channel': directElement.channel, 
                'isCurrentChannel': true,
                'isNewMessageArrived' : false,
            };
            this.ngRedux.dispatch({ type: Constants.USEREDIT, payload: userEditPayload })

            this.ngRedux.dispatch({ type: Constants.CURRENTCHANNELADD, payload: payload })

        }else{
            // If none of above condition is met, the channel is invalid, hence redirect user
            this.router.navigate([`../messages`, this.username]);
            this.isChannelCurrent(this.username)
            // this.shiftChannel(this.username, true)
            console.log("This is not a valid channel :", channelInput);
        }
    }

    shiftChannel = (channel: string, isPrivate: boolean) => {
        this.isChannelCurrent(channel);
    }


    sendInvite = (invitedUuid, room) => {

        let user = this.ChatEngine.User(invitedUuid);
        let chat = this.createChat(room, true);
        chat.invite(user);
        return room;

    }

    publish = (message) => {
        
        let chat = this.createChat(this.currentChat, this.isPrivate);
        chat.emit('message', {
            text: message,
            channel: this.currentChat,
            nickName: this.username,
            fullName: this.fullName,
            edited: false,
            date: new Date()
        });
    }

    global = () => {
        
    }

    channelAdd = (channelDisplayName) => {
        //Only Public Channel Add runs this
        let channelName = this.UserServicee.getChannelName()
            .switchMap((response) => {
                return this.UserServicee.addPublicPrivateChannel(response.data.name, channelDisplayName, false)
            });
            
        channelName.subscribe(response => {
            let allChannels = this.getAllChannelDetails(this.createChat(response.data.channel, false));
            this.handleAllChannels(allChannels, true);
            this.router.navigate([`../messages`, response.data.channel]);
        })                       
    }

    channelEdit = (dataObj) => {
        if (this.currentChatObj.cId) {
            let channelName = this.UserServicee.editPublicPrivateChannel(
                this.currentChatObj.cId,
                dataObj.channelName,
                dataObj.isPrivate,
                this.currentChatObj.channel
            )
            channelName.subscribe(
                (responseData) => {
                    window.location.reload();
            })
            
        }

    }

    logout(subscribe = false) {
        console.log("Logout");
        return this.auth.logout().subscribe(
            (res) => {
                this.snackBar.open("Successfully Logged Out", " ", {
                    duration: 2000,
                });
            }
        );
    }
        
    

} 