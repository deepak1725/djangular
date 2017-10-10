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
	channel = 'hello_world'
	rakeArray = new Array(1);
	channelInit: object;
	pubnub: PubNubAngular;
	chatMsg: string;
	allMessages: any;
	publishResponse: Observable<Array<string>>;
	userFullName: String
	userUUID: String

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
		this.channelInit = pubnub.init({
			publishKey: 'pub-c-3aef0945-de13-4a67-9b27-cbbee629b4bf',
			subscribeKey: 'sub-c-868bb34a-a77d-11e7-b28d-d2281ea74b72',
			userUUID: this.userUUID
		});
	}

	ngOnInit() {
		this.channelSubscribe([this.channel]);
		this.channelHistory(this.channel);
		this.userFullName = this.userService.getUserName();
		this.pubnub.hereNow(
			{
				channels: [this.channel],
				// channelGroups : ["my_channelGroup"],
				includeUUIDs: true,
				includeState: true
			},
			function (status, response) {
				// console.log(status);
				// console.log(response);
			}
		);
		
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
			withPresence: true
		}),
			function (status, response) {
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
		let msgToken;
		this.channelPublish(message)
						.then((res) => {
							console.log("publishres",res);
							//PUSHING MSG
							var obj = {
								entry:{
									text:message,
									name: this.userFullName,
									userId: this.userUUID
								},
								timetoken: res.timetoken
							}
							this.allMessages.push(obj);
						}).catch((error) => {
							console.log(error)
						})

		formData.reset()
	}

	renderMessages = function (messageData) {
		this.allMessages = messageData.messages;
	}

	getReadableTime(unixTime) {
		var date = new Date(unixTime / 1e4)
		let now = moment(date).fromNow();
		return now;
	}
}
