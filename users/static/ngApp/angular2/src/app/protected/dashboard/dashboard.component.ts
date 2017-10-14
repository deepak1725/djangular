import { Component, ViewEncapsulation, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { NgForm } from '@angular/forms';
import { PubNubAngular } from 'pubnub-angular2';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { ChatService} from '../../_services/chat.service'
import {UserService} from '../../_services/user.service'


@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [PubNubAngular, ChatService ]
	// encapsulation: ViewEncapsulation.None,

})
export class DashboardComponent implements OnInit, AfterViewChecked {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
	
	title = 'Dashboard';
	channel = ['hello_world']
	channelGroup = "Djangular"
	rakeArray = new Array(90);
	pubnub: PubNubAngular;
	allMessages: any;
	userFullName: String
	userUUID: String
	occupancy: number
	// -------------- Chat -------------------

	constructor(
		pubnub: PubNubAngular, 
		public chatService: ChatService,
		public userService: UserService,
		
	) {
		
		this.pubnub = pubnub;
		this.chatService.getUuid().subscribe(
			(response) => {
				pubnub.setUUID(response)
				this.userUUID=response
			}
		)
		pubnub.init({
			publishKey: 'pub-c-3aef0945-de13-4a67-9b27-cbbee629b4bf',
			subscribeKey: 'sub-c-868bb34a-a77d-11e7-b28d-d2281ea74b72',
			userUUID: this.userUUID
		});

		pubnub.channelGroups.addChannels(
			{
				channels: this.channel,
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
		pubnub.channelGroups.listChannels(
			{
				channelGroup: "djangular"
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

	ngOnInit() {
		this.channelListener();
		this.channelSubscribe([this.channel]);
		this.channelHistory(this.channel[0]);
		this.userFullName = this.userService.getUserName();
		this.channelHerenow()
	}

	channelListener = function(){
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
	
	getUuid(){
		this.chatService.getUuid().subscribe(
			(response) => console.log('getUUID',response)
		)
	}

	ngAfterViewChecked() {
		// console.log("View Checked");        
        this.scrollToBottom();        
	}

	scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
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
	channelHistory = function (channelName: string) {
		var that = this
		this.pubnub.history({
			channel: channelName,
			reverse: false, // false is the default
			count: 100, // 100 is the default
			stringifiedTimeToken: true, // false is the default
		},
			function (status, response) {
				console.log(response);
				that.renderMessages(response);
			}
		);
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
				that.occupancy = response.channels.hello_world.occupancy
			}
		);
	}
	channelPublish = function(msg){
		return this.pubnub.publish({
			message: {
				text: msg,
				name: this.userFullName,
				userId: this.userUUID
			},
			channel: this.channel,
			storeInHistory: true,
			ttl: 10

		})
	}

	// userGetUuid = function(){
	// 	return this.pubnub.getUUID()
	// }




	sendMessage = function (formData: NgForm) {
		let message = formData.value.message
		this.chatMsg = formData.value.message;
		this.channelPublish(message)
						.then((res) => {
							console.log("publishres",res);
						}).catch((error) => {
							console.log(error)
						})

		formData.reset()
	}

	renderMessages = function (messageData) {
		console.log(messageData);
		this.allMessages = messageData.messages;
	}

	getReadableTime(unixTime) {
		var date = new Date(unixTime / 1e4)
		let now = moment(date).fromNow();
		return now;
	}
}
