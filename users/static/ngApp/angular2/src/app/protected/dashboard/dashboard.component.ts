import { OnlineFriendsDialog } from './../dialogs/online-friends.dialog';
import { concat } from 'rxjs/operator/concat';
import { Component, ViewEncapsulation, 
	OnInit, AfterViewChecked, 
	ElementRef, ViewChild, 
	OnChanges, SimpleChanges,
	AfterViewInit, Inject
} from '@angular/core';
import { NgForm } from '@angular/forms';
// import { PubNubAngular } from 'pubnub-angular2';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { ChatService} from '../../_services/chat.service'
import { NewchatService } from '../../_services/newchat.service'
// import { AuthenticationService } from '../../_services/authentication.service'
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
import {EditChannelDialog} from '../dialogs/edit-channel.dialog'
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
	chatObjectForView: IChatObjectForView = {
		room : "no",
		online: 0
	}
	
	currentChat = this.chatService.currentChat
	// @select(['current_channel', 'payload']) readonly currentChannel$: Observable<any>;


	constructor(
		public chatService: NewchatService,
		private ngRedux: NgRedux<IAppState>,
		public dialog: MatDialog,
		private router: Router,
		private route: ActivatedRoute,
		public snackBar: MatSnackBar,
		
	) {
		
	}

	ngOnInit() {
		this.scrollToBottom();
		// this.events(NavigationEnd);
		this.chatService.callStack();
		// this.subscribeCurrentChannel();
		// let channel = this.route.snapshot.paramMap.get('channel');		
		// this.currentChat = this.fetchChannelNameFromString()
		// this.currentChannel$.subscribe((event) => {
        //     console.log("Current Channel Changed", event);
		// 	this.chatService.history(event)
        // })
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

		dialogRef.afterClosed().subscribe((result="") => {
			result = result.replace(/\s/g, '')
			if (result) {
				console.log(result);
				this.newChannel = result;
				this.chatService.channelAdd(result)
			}
		});
	}

	// subscribeCurrentChannel = () => {
	// 	this.currentChannel$.subscribe(
	// 		(payload) => {
	// 			this.currentChannelPayload = payload
	// 		});
	// }

	onlineUsers(displayName):void{
		let chat = this.chatService.createChat(this.chatService.currentChatObj.channel); 
		let dataObj = {
			displayName: this.chatService.currentChatObj.displayName,
			chatusers: Object.keys(chat.users)
		}	

		let dialogRef = this.dialog.open(OnlineFriendsDialog, {
			width: '300px',
			data: dataObj,
		});
		
		dialogRef.afterClosed().subscribe((result = "") => {
		});
	}

	onOnlineUserClick = (user) => {

	}


	editChannel(): void {
		let currentChatDisplayName = this.chatService.currentChatObj.displayName.replace("#", "");
		let isPrivate = this.chatService.currentChatObj.isPrivate;

		let dialogRef = this.dialog.open(EditChannelDialog, {
			width: '400px',
			data: { channel: currentChatDisplayName, isPrivate: isPrivate  }
		});

		dialogRef.afterClosed().subscribe((dataObj = {}) => {
			console.log("Resukt", dataObj)
			if (dataObj.channelName) {
				dataObj.channelName = dataObj.channelName.replace(/\s/g, '')
			}
			if (dataObj.channelName) {
				console.log(dataObj);
				// this.newChannel = result;
				this.chatService.channelEdit(dataObj)
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

	logout(){
		this.chatService.logout()
	}

	// fetchChannelNameFromString = ():any => {
	// 	let channel: string = this.route.snapshot.paramMap.get('channel');
	// 	let ar = channel.split("#");
	// 	let channelName = ar.pop(); 
	// 	let isPrivate = ar.pop();
	// 	let userDetails = this.chatService.myPrivateChannels.find((arg): any => arg.channel == channelName)
	// 	console.log(userDetails);
	// 	if (isPrivate == 'private.'){
			
	// 		let userDetails = this.chatService.myPrivateChannels.find((arg): any => arg.channel == channelName)
	// 		return `@${userDetails.username}`;
	// 	}else{
	// 		return `#${channelName}`;
	// 	}
	// }

	events = (naviEnd) => {
		this.router.events.subscribe(
			 (event: Event) => {
				
				 if (event instanceof NavigationEnd) {
					
					//  this.currentChat = this.fetchChannelNameFromString()
					
					//  this.chatService.isChannelCurrent();
				 }
			 }
		)
	}

	channelClicked = (channel, isPrivate) => {
		this.chatService.channelInput = channel;
		this.chatService.shiftChannel(channel, isPrivate);
	}


}

export interface IChatObjectForView {
	room: string,
	online: number
}