import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { NgForm } from '@angular/forms';
import { PubNubAngular } from 'pubnub-angular2';
import * as moment from 'moment';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [PubNubAngular]

	// encapsulation: ViewEncapsulation.None,

})
export class DashboardComponent implements OnInit{

	title = 'Dashboard';
	fakeArray = new Array(1);
	rakeArray = new Array(1);
	channelInit: object;
	pubnub:PubNubAngular;
	allMessages:any;
	publishResponse:any;

	// -------------- Chat -------------------
	
	constructor(pubnub: PubNubAngular) {

		this.channelInit = pubnub.init({
			publishKey: 'pub-c-3aef0945-de13-4a67-9b27-cbbee629b4bf',
			subscribeKey: 'sub-c-868bb34a-a77d-11e7-b28d-d2281ea74b72'
		});
		
		this.pubnub=pubnub;
	}

	ngOnInit(){
		this.channelSubscribe(['hello_world']);		
		this.channelHistory('hello_world');
		
	}

	channelSubscribe = function(channelArray = null):any{
		this.pubnub.subscribe({
			channels: channelArray,
			withPresence: true
		}),
		function (status, response) {
		};
	}

	channelPublish = function(msg = null):any{
		let that = this;
		this.pubnub.publish({
			message: {
				text: msg
			},
			channel: 'hello_world',
			storeInHistory: true,
			ttl: 10
		}).then((response) => {
			console.log(response)
			console.log(that.allMessages)
			that.publishResponse = response;
			console.log(that.publishResponse)
		}).catch((error) => {
			this.response = "Error";			
			console.log(error)
		}),
		function () {
			console.log("CallBack Publish");
		};
		return this.publishResponse
		
	}

	channelHistory = function(channelName:string){
		var that = this
		this.pubnub.history({
				channel: channelName,
				reverse: false, // false is the default
				count: 100, // 100 is the default
				// stringifiedTimeToken: true, // false is the default
			},
			function (status, response) {
				console.log(response.messages);

				that.renderMessages(response);
			}
		);
	}

	getReadableTime(unixTime){
		var date = new Date(unixTime/1e4)
		let now = moment(date).fromNow();
		return now;
	}

	sendMessage = function (formData: NgForm) {
		console.log(formData.value.message);
		let prest = this.channelPublish(formData.value.message);
		console.log("OLd Response");
		console.log("pres", prest);
		console.log(this.publishResponse);
		// this.allMessages.push("Hey");
		formData.reset()
	}

	renderMessages = function(messageData){
		console.log(messageData);
		this.allMessages = messageData.messages;
	}

}
