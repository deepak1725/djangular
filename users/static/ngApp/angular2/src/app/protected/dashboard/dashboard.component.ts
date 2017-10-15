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
	
	rakeArray = new Array(90);
	allMessages: any[] = [];
	userFullName: String
	userUUID: String
	occupancy: number
	channel = ['hello_world']

	constructor(
		public chatService: ChatService,
		public userService: UserService,
		public pubnub: PubNubAngular
	) {
	}

	ngOnInit() {
		this.chatService.chatInit();
		this.chatService.channelList();
		this.chatService.channelListen();
		this.chatService.channelSubscribe(this.channel);
		var that = this
		

		this.userFullName = this.userService.getUserName();
		this.chatService.channelHerenow()
	}

	getMessage = function(){
		let that = this
		this.chatService.channelHistory("hello_world")
		.then((response,fd) => { 
			this.allMessages = response
		}
		);

		console.log("AllMessage", this.allMessages)
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


	sendMessage = function (formData: NgForm) {
		let message = formData.value.message
		this.chatMsg = formData.value.message;

		this.chatService.channelPublish(message, this.channel[0])
						

		formData.reset()
	}

	// channelHistory = function (channel: string) {
	// 	var that = this
	// 	this.pubnub.history({
	// 		channel: channel,
	// 		reverse: false, // false is the default
	// 		count: 100, // 100 is the default
	// 		stringifiedTimeToken: true, // false is the default
	// 	},
	// 		function (status, response) {
	// 			that.allMessages = response;
	// 			console.log(that.allMessages)
	// 		}
	// 	);
	// }

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
