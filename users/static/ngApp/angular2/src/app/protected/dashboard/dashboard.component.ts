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
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {rootReducer, ChatAppState } from '../../_store/store';
import { NgRedux, select } from '@angular-redux/store';
import { CounterActions } from '../../_models/actions';


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
	@select() readonly count$: Observable<number>;
	subscription;

	constructor(
		public chatService: ChatService,
		private ngRedux: NgRedux<ChatAppState>,
		private actions: CounterActions
	) {}

	ngOnInit() {
		this.chatService.chatInit();
		this.chatService.listChannels(this.channelGroup);
		this.chatService.channelListen();
		this.chatService.channelSubscribe();
		// this.chatService.channelAdd('general');
		this.chatService.channelWhereNow();
		this.chatService.presenceChannel();
		// this.chatService.getState();
		// this.chatService.listChannels(this.channelGroup);
		// this.chatService.removeChannel('ch-deepak-present');
		// this.chatService.removeGroup();
		
		this.scrollToBottom();
		
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
		if (message) {
			message = message.replace(/^\s\s*/, '').replace(/\s\s*$/, '')

			if (message) {
				this.chatService.channelPublish(message, this.chatService.channelInput)
			}
		}
						

		formData.reset()
	}

	increment(){
		this.ngRedux.dispatch(this.actions.increment());
	}

	dec(){
		this.ngRedux.dispatch(this.actions.decrement());		
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
