import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Constants } from '../_store/constants'

import { User } from '../_models/user';
import { PubNubAngular } from 'pubnub-angular2';
import {DashboardComponent} from '../protected/dashboard/dashboard.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { rootReducer, IAppState } from '../_store/store';


@Injectable()
export class ChatService {
    headers: Headers;
    options: RequestOptions;
    username : string;
    allMessages: any[] = [];
    occupancy: number;
    fullName: string;
    channelList: string[] = [];
    channelInput: string = 'general';
    channelGroup = "Djangular"
    totalChannel: number;
    groupOccupancy: number;
    groupOccupants: any[] = [];


    constructor(
        private http: Http, 
        public pubnub: PubNubAngular,
        private route: ActivatedRoute,
        private ngRedux: NgRedux<IAppState>,
    ) {
        
        this.options = new RequestOptions ();

        if (this.options.headers == null) {
            this.options.headers = new Headers();
        }

        this.options.headers.append('Content-Type', 'application/json');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.user.username;
        this.fullName = currentUser.user.first_name +' ' + currentUser.user.last_name;
        
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
                let currentUser = JSON.parse(localStorage.getItem('currentUser'));
                return currentUser.user.username
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

// ------------********----  PUBNUB -----**********-------------------


    chatInit(){
        this.pubnub.init({
            publishKey: 'pub-c-3aef0945-de13-4a67-9b27-cbbee629b4bf',
            subscribeKey: 'sub-c-868bb34a-a77d-11e7-b28d-d2281ea74b72',
            uuid: this.username
        });
        this.pubnub.setUUID(this.username);
    };

    channelAdd(channel = this.username, group = this.channelGroup){
        this.pubnub.channelGroups.addChannels(
            {
                channels: [channel],
                channelGroup: group
            }, 
            (status) => {
                if (status.error) {
                    console.log("operation failed w/ status: ");
                }else{
                    console.log("channel added to group Done");
                } 
            }
        );
    };

    listChannels(channelGroup){
		this.pubnub.channelGroups.listChannels(
			{
				channelGroup: channelGroup
			}, 
			(status, response) => {
				if (status.error) {
					console.log("operation failed w/ error:", status);
					return;
                }
                console.log("List Channels", response);
                this.channelList = response.channels;
                
                if (this.channelList.includes(this.route.snapshot.paramMap.get('channel'))) {
                    this.channelInput = this.route.snapshot.paramMap.get('channel')
                    this.channelHistory(this.channelInput);
                }
                
                // this.makeArray(response.channels);
                
			}
		);
    }

    makeArray = (channels) => {
        channels.map((channel) => {
            this.channelHistory(channel);
        })
    }


    channelSubscribe = (channel = this.channelInput) => {
            
            this.pubnub.subscribe({
                restore: true,
                channelGroups: [this.channelGroup],
                withPresence: true,
                triggerEvents: ['message', 'presence', 'status'],

            }), 
            (status, response) => {
            };
        
    }
    
    channelHistory = (channel) => {
        this.pubnub.history({
            channel: channel,
            reverse: false, // false is the default
            count: 50, // 100 is the default
            stringifiedTimeToken: true, // false is the default
        }).then((response,fd) => { 
            this.allMessages = response.messages;
            // To CHANGE CHANNAL NAME
            this.channelInput = this.route.snapshot.paramMap.get('channel');
        });
    }
    
    channelHerenow = (channel = this.channelInput) => {
		this.pubnub.hereNow(
			{
                includeUUIDs: true,
                includeState: true,
			},
			(status, response) => {  
                
                this.totalChannel = response.totalChannels;
                if (status.error) {
                    console.log("operation failed w/ error:", status)
                    return;
                }
                
                console.log("ONLINE NOW: ", response)
                var arr: any[] = Object.keys(response.channels).map((key, index) => {
                    console.log("arr", response.channels[key]);
                    return this.ngRedux.dispatch({ type: Constants.CHANNELADD, name: [response.channels[key]] })
                });

                                
                return this.groupOccupants = this.groupOccupants;
                           
			}
		);
    }
    
    channelPublish = (message, channel) => {
		return this.pubnub.publish({
			message: {
				text: message,
				name: this.fullName,
				username: this.username
			},
			channel: channel,
			storeInHistory: true,
            ttl: 10,                
        })
        .then((res) => {
            console.log("MEssgae Succesfully sent");
        }).catch((status, error) => {
            console.log(error)
        })
    }
    
    channelListen = () => {
		this.pubnub.addListener({
			status: (st) => {
                console.log("In Listen, Status", st);
				if (st.category === "PNUnknownCategory") {
					this.setState();
				}
			},
			message: (response) =>  {
                //PUSHING MSG
                console.log("In Listen, response");                
				var obj = {
					entry:{
						text:response.message.text,
						name: response.message.name,
						username: response.message.username
					},
					timetoken: response.timetoken
                }
				this.allMessages.push(obj);

            },
            presence: (presenceEvent) => {
                console.log('Friends Presence: ', presenceEvent)
            } 
		});
    }

    presenceChannel = () => {
        return this.pubnub.getPresence(this.channelGroup, function(pse) {
            console.log("pse", pse);
        });
    }

    removeChannel = (channel) => {
        this.pubnub.channelGroups.removeChannels(
            {
                channels: [channel],
                channelGroup: this.channelGroup
            },
             (status) => {
                if (status.error) {
                    console.log("operation failed w/ error:", status);
                } else {
                    console.log("operation done!");
                }
            }
        );
     }

    removeGroup = () => {
        this.pubnub.channelGroups.deleteGroup(
            {
                channelGroup: this.channelGroup
            },
             (status) => {
                if (status.error) {
                    console.log("operation failed w/ error:", status);
                } else {
                    console.log("operation done!");
                }
            }
        );
    }
    
    channelWhereNow = () => {
        this.pubnub.whereNow(
            {
                uuid: this.username
            },
             (status, response) => {
                console.log("WhereNow", response);
                response.channels.forEach(channel => {
                    // this.channelHerenow(channel);
                    console.log('WhereNowCallback', channel);
                });
            }
        );
    }

    setState = () => {
        var newState = {
            new: 'state'
        };
        this.pubnub.setState(
            {
                state: {
                    state : newState
                },
                uuid: this.username,
                channels: ['my_channel']
            },
             (status, state) => {
                console.log("SetState", state);
                // handle state setting response
            }
        );
    }
    getState = (channel) => {
        this.pubnub.getState(
            {
                uuid: this.username,
                channels: [channel]
            },
             (status, state) => {
                console.log("GETState",state);
                // handle state setting response
            }
        );
    }
    























}