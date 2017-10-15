import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../_models/user';
import { PubNubAngular } from 'pubnub-angular2';
import {DashboardComponent} from '../protected/dashboard/dashboard.component';

@Injectable()
export class ChatService {
    headers: Headers;
    options: RequestOptions;
    userId : string;
	channelGroup = "Djangular"
    allMessages: any[] = [];
    occupancy: number


    constructor(private http: Http, public pubnub: PubNubAngular) {
        this.options = new RequestOptions ();

        if (this.options.headers == null) {
            this.options.headers = new Headers();
        }

        this.options.headers.append('Content-Type', 'application/json');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userId = currentUser.user.userId;

        if (currentUser && currentUser.token) {
            this.options.headers.append('Authorization', 'JWT ' + currentUser.token);
        }else {
            this.options.headers.append('Authorization', 'JWT ' + 'currentUser.token');
        }

        

      
    }

    getUuid() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const url = '/api/chat/' + currentUser.user.pk;
        return this.http.get(url, this.options)
            .map((response: Response) => {
                const res = response.json();
                localStorage.setItem('userUuid', JSON.stringify(res.uuid));
                return currentUser.user.username;
            }

        );
    }

    setUuid() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const user = {
            'user': currentUser.user.pk
        };
        return this.http.post('/api/chat/', user, this.options)
            .map((response: Response) => response.json());
    }

    getAllUsers() {
        return this.http.get(
            'api/users',
            this.options
        )
        .map((response: Response) => {
            const apiresponse = JSON.stringify(response);
            return apiresponse;
        });
    }

// ------------********----  PUBNUB -----**********-------------------


    chatInit(){
        this.pubnub.init({
            publishKey: 'pub-c-3aef0945-de13-4a67-9b27-cbbee629b4bf',
            subscribeKey: 'sub-c-868bb34a-a77d-11e7-b28d-d2281ea74b72',
            userUUID: this.userId
        });
    }

    channelAdd(channel){
        this.pubnub.channelGroups.addChannels(
            {
                channels: channel,
                channelGroup: this.channelGroup
            }, 
            function(status) {
                if (status.error) {
                    console.log("operation failed w/ status: ");
                } else {
                    console.log(status,"operation done!")
                }
            }
        );
    }

    channelList(){
        console.log("Chanel List");
		this.pubnub.channelGroups.listChannels(
			{
				channelGroup: this.channelGroup
			}, 
			function (status, response) {
				if (status.error) {
					console.log("operation failed w/ error:", status);
					return;
				}
				 
				console.log(response,"listing push channel for device")
				response.channels.forEach( function (channel) {
					console.log(channel)
				})
			}
		);
    }

    channelSubscribe = function (channelArray = null): any {
		this.pubnub.subscribe({
			channels: channelArray,
			withPresence: true,
		}),
			function (status, response) {
				console.log(response);
			};
    }
    
    channelHistory = function (channel: string) {

        const that = this
		return this.pubnub.history({
			channel: channel,
			reverse: false, // false is the default
			count: 100, // 100 is the default
			stringifiedTimeToken: true, // false is the default
		});
    }
    
    
    
    channelHerenow = function(){
		let that = this;
		this.pubnub.hereNow(
			{
				channels: this.channel,
				includeUUIDs: true,
				includeState: true
			},
			function (status, response) {
                console.log("HereNow", response);
				that.occupancy = response.channels.hello_world.occupancy
			}
		);
    }
    
    channelPublish = function(msg, channel){
		return this.pubnub.publish({
			message: {
				text: msg,
				name: this.userFullName,
				userId: this.userUUID
			},
			channel: channel,
			storeInHistory: true,
			ttl: 10
        })
        .then((res) => {
            console.log("publishres",res);
        }).catch((status, error) => {
            console.log("Status", status)
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
						userId: response.message.userId
					},
					timetoken: response.timetoken
                }
				that.allMessages.push(obj);

				console.log(response);
			}
		});
	}
    























}