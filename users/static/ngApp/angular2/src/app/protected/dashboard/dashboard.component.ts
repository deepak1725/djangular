import { Component, ViewEncapsulation, 
	OnInit, AfterViewChecked, 
	ElementRef, ViewChild, 
	OnChanges, SimpleChanges,
	AfterViewInit
} from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { NgForm } from '@angular/forms';
// import { PubNubAngular } from 'pubnub-angular2';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { ChatService} from '../../_services/chat.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {rootReducer,IAppState } from '../../_store/store';
import { NgRedux, select } from '@angular-redux/store';
import { Action } from 'redux';
import {Constants} from '../../_store/constants'

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [ ChatService ]
	// encapsulation: ViewEncapsulation.None,

})
export class DashboardComponent implements OnInit {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
	
	title = 'Dashboard';
	rakeArray = new Array(90);

	constructor(
		public chatService: ChatService,
		private ngRedux: NgRedux<IAppState>,
	) {}

	ngOnInit() {
		this.chatService.callStack();
		this.channelClicked(this.chatService.channelInput)
		this.scrollToBottom();
	}


	ngAfterViewChecked() {
		this.scrollToBottom();
	}

	
	scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch(err) { }                 
	}


	sendMessage = function (form: NgForm) {
		let message = form.value.message
		if (message) {
			message = message.replace(/^\s\s*/, '').replace(/\s\s*$/, '')

			if (message) {
				this.chatService.channelPublish(message, this.chatService.channelInput)
			}
		}
						

		form.reset()
	}


	getReadableTime(unixTime) {
		var date = new Date(unixTime / 1e4)
		let now = moment(date).fromNow();
		return now;
	}

	channelClicked(channel){
		this.chatService.channelHistory(channel);
		console.log("Clicked",this.chatService.channelInfo);
		this.chatService.getChannelDetails(channel);
		// this.chatService.channel$.subscribe(data => console.log("data",data)).unsubscribe();
	}
}
