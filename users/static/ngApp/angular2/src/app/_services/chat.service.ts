import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { User } from '../_models/user';
import { PubNubAngular } from 'pubnub-angular2';
import {DashboardComponent} from '../protected/dashboard/dashboard.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


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
            userUUID: this.username
        });
    };

    channelAdd(channelGroup, channel){
        this.pubnub.channelGroups.addChannels(
            {
                channels: [channel],
                channelGroup: channelGroup
            }, 
            function(status) {
                if (status.error) {
                    console.log("operation failed w/ status: ");
                }else{
                    console.log("Operation add channel Done");
                } 
            }
        );
    };

    listChannels(channelGroup){
        var that = this;
		this.pubnub.channelGroups.listChannels(
			{
				channelGroup: channelGroup
			}, 
			function (status, response) {
				if (status.error) {
					console.log("operation failed w/ error:", status);
					return;
				}
				response.channels.forEach( function (channel) {
                    that.channelList.push(channel);
                    // that.channelSubscribe(channel);
                })
                
                
                if (that.channelList.includes(that.route.snapshot.paramMap.get('channel'))) {
                    that.channelInput = that.route.snapshot.paramMap.get('channel')
                    that.channelHistory(that.channelInput);
                }
                
                
			}
		);
    }

    channelSubscribe = function (channel = this.channelInput){
            console.log("In Subscribe");
            return this.pubnub.subscribe({
                channelGroups: [this.channelGroup],
                withPresence: true,
            }), 
            function (status, response) {
                console.log(status);
                console.log(response);
            };
        
    }
    
    channelHistory = function (channel) {
        this.pubnub.history({
            channel: channel,
            reverse: false, // false is the default
            count: 100, // 100 is the default
            stringifiedTimeToken: true, // false is the default
        }).then((response,fd) => { 
            this.allMessages = response.messages;
            this.channelInput = this.route.snapshot.paramMap.get('channel');
        });


    }
    
    
    
    channelHerenow = function(channel=this.channelInput){
		let that = this;
		this.pubnub.hereNow(
			{
                includeUUIDs: true,
                includeState: true,
			},
			function (status, response) {  
                console.log("Here Now response", response);              
                var occupants:object[] = [];
                var map:any[] = [];

                for (var key in response.channels) {
                    if (response.channels.hasOwnProperty(key)) {
                        var element = response.channels[key];
                        element.occupants.map((occupant) => {
                            occupants.push(occupant)
                        })
                    }
                }
                
                that.occupancy = response.channels[channel].occupancy;
                that.totalChannel = response.totalChannels;
                console.log(occupants);                
                return that.groupOccupants = that.groupOccupants;
                           
			}
		);
    }
    
    channelPublish = function(message, channel){
		return this.pubnub.publish({
			message: {
				text: message,
				name: this.fullName,
				username: this.username
			},
			channel: channel,
			storeInHistory: true,
			ttl: 10
        })
        .then((res) => {
        }).catch((status, error) => {
            console.log(error)
        })
    }
    
    channelListen = function(){
		let that = this; 
		this.pubnub.addListener({
			status: function(st) {
				if (st.category === "PNUnknownCategory") {
					var newState = {new: 'error'};
					this.pubnub.setState({
						state: newState
					},
					function (status) {
						console.log(st.errorData.message);
					});
				}
			},
			message: function(response) {
				//PUSHING MSG
				var obj = {
					entry:{
						text:response.message.text,
						name: response.message.name,
						username: response.message.username
					},
					timetoken: response.timetoken
                }
				that.allMessages.push(obj);

			}
		});
	}
    























}