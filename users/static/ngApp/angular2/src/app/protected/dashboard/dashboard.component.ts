import { Component, ViewEncapsulation, 
	OnInit, AfterViewChecked, 
	ElementRef, ViewChild, 
	OnChanges, SimpleChanges,
	AfterViewInit
} from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { NgForm } from '@angular/forms';
import { PubNubAngular } from 'pubnub-angular2';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { ChatService} from '../../_services/chat.service'
import {UserService} from '../../_services/user.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [PubNubAngular, ChatService ]
	// encapsulation: ViewEncapsulation.None,

})
export class DashboardComponent implements OnInit {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
	
	title = 'Dashboard';
	channelGroup = "Djangular"
	rakeArray = new Array(90);
	allMessages: any;



	constructor(
		public chatService: ChatService,
		public userService: UserService,
		
	) {
	}

	ngOnInit() {
		this.chatService.chatInit();
		this.chatService.listChannels(this.channelGroup);
		this.chatService.channelListen();
		this.chatService.channelSubscribe();
		this.chatService.channelHerenow();
		
		// this.chatService.channelHerenow(this.channelGroup)
		// console.log(channelInput);
		// console.log(this.chatService.channelList);

		
		// this.chatService.channelAdd(this.channelGroup, "general")        
		
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

		this.chatService.channelPublish(message, this.chatService.channelInput)
						

		formData.reset()
	}

	getReadableTime(unixTime) {
		var date = new Date(unixTime / 1e4)
		let now = moment(date).fromNow();
		return now;
	}
	channelClicked(channel){
		console.log(channel);
		this.chatService.channelHistory(channel);
	}
}
