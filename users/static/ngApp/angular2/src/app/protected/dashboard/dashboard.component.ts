import { Component, ViewEncapsulation, 
	OnInit, AfterViewChecked, 
	ElementRef, ViewChild, 
	OnChanges, SimpleChanges,
	AfterViewInit, Inject
} from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { NgForm } from '@angular/forms';
// import { PubNubAngular } from 'pubnub-angular2';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { ChatService} from '../../_services/chat.service'
import { NewchatService } from '../../_services/newchat.service'
import { Router, ActivatedRoute, ParamMap, Event, NavigationStart, NavigationEnd } from '@angular/router';
import {rootReducer,IAppState } from '../../_store/store';
import { NgRedux, select } from '@angular-redux/store';
import { Action } from 'redux';
import {Constants} from '../../_store/constants'
// import { FormGroup, FormBuilder, FormControl, Validators  } from '@angular/forms';
import * as ChatEngineCore from 'chat-engine';

import {Channel} from '../../_models/channel'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {AddChannelDialog} from '../dialogs/add-channel.dialog'
import {RemoveChannelDialog} from '../dialogs/remove-channel.dialog'
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../_services/user.service';




@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [NewchatService ]
	// encapsulation: ViewEncapsulation.None,

})


export class DashboardComponent implements OnInit {
    @ViewChild('scrollMe') private myScrollContainer: ElementRef;
	
	title = 'Dashboard';
	rakeArray = new Array(90);
	newChannel: string = '';
	ChatEngine
	chatObjectForView: IChatObjectForView = {
		room : "no",
		online: 0
	}


	constructor(
		public chatService: NewchatService,
		private ngRedux: NgRedux<IAppState>,
		public dialog: MatDialog,
		private router: Router,
		private route: ActivatedRoute,
		private UserServicee: UserService,
	) {
		this.UserServicee.getUserChannelDetails(2)
	}

	ngOnInit() {
		this.chatService.callStack();
		this.scrollToBottom();
		this.events(NavigationEnd);
			
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
		message = message.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
		if (message) {
			this.chatService.publish(message)
			// this.chatService.publishDirectMessage('deepak')
		}
						

		form.reset()
	}


	getReadableTime(userTime) {
		let now = moment(userTime).fromNow();
		return now;
	}

	addChannel():void{
		
		let dialogRef = this.dialog.open(AddChannelDialog, {
			width: '300px',
			data: { name: this.newChannel }
		});

		dialogRef.afterClosed().subscribe(result => {
			result = result.replace(/\s/g, '')
			if (result) {
				this.newChannel = result;
				// this.chatService.channelAdd(result)
				// console.log('result', result);
			}
		});
	}

	removeChannel():void{
		let dialogRef = this.dialog.open(RemoveChannelDialog, {
			width: '300px',
			data: { name: this.newChannel }
		});

		dialogRef.afterClosed().subscribe(() => {
				// console.log('Remove Channel');
				// this.chatService.removeChannel(this.chatService.channelInfo.name)
		});
	}

	fetchChannelNameFromString = (channel:string):string => {
		if (channel) {	
			let ar = channel.split("#");
			return ar.pop();
		}	
	}
	events = (naviEnd) => {
		this.router.events.subscribe(
			 (event: Event) => {
				//  if (event instanceof NavigationStart) {
				// 	 console.log("Navigation Started");
				// 	 let channelInput: string = this.route.snapshot.paramMap.get('channel');
				// 	 let channelType: string = this.route.snapshot.paramMap.get('type');

				// 	 //  let alll: any = this.route.snapshot.paramMap.params;
				// 	 console.log("ChannelType", channelType);
				// 	 console.log("ChannelInput", channelInput);
				//  }
				 if (event instanceof NavigationEnd) {
					//  console.log("Navigation Ended");
					 
					//  let channelInput: string = this.route.snapshot.paramMap.get('channel');
					//  let channelType: string = this.route.snapshot.paramMap.get('type');
					 
					//  let alll: any = this.route.snapshot.paramMap.params;
					//  console.log("ChannelType", channelType);
					//  console.log("ChannelInput", channelInput);
					//  this.chatService.channelInput = channelInput;
					//  this.chatService.updateChatObject();
					//  this.chatService.shiftChannel(channelInput, channelType);
				 }
			 }
		)
	}

	channelClicked = (channel, isPrivate) => {
		 this.chatService.channelInput = channel;
		this.chatService.updateChatObject(channel, isPrivate);
		this.chatService.shiftChannel(channel, isPrivate);
	}


}

export interface IChatObjectForView {
	room: string,
	online: number
}