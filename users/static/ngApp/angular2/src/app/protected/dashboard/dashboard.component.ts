import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { NgForm } from '@angular/forms';
import { PubNubAngular } from 'pubnub-angular2';


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

	// -------------- Chat -------------------
	
	constructor(pubnub: PubNubAngular) {

		this.channelInit = pubnub.init({
			publishKey: 'pub-c-3aef0945-de13-4a67-9b27-cbbee629b4bf',
			subscribeKey: 'sub-c-868bb34a-a77d-11e7-b28d-d2281ea74b72'
		});
		
		this.pubnub=pubnub;
		console.log("Init", this.channelInit);
	}

	ngOnInit(){
		this.channelHistory('hello_world'),function(status){
			console.log(status);
		};
	}

	channelSubscribe = function(channelArray = null):any{
		this.pubnub.subscribe({
			channels: channelArray,
			withPresence: true
		}),
		function (status, response) {
			console.log(response);
		};
	}

	channelPublish = function(msg = null):any{
		this.pubnub.publish({
			message: {
				text: msg
			},
			channel: 'hello_world',
			storeInHistory: true,
			ttl: 10
		}).then((response) => {
			console.log(response)
		}).catch((error) => {
			console.log(error)
		});
		return null
	} 


	channelHistory = function(channelName:string){
		this.pubnub.history({
				channel: channelName,
				reverse: false, // false is the default
				count: 100, // 100 is the default
				stringifiedTimeToken: true, // false is the default
				end:"15070522842665239"
			},
			function (status, response) {
				console.log("response",response);
			}
		);
	}

	sendMessage = function (data: NgForm) {
		console.log(data.value.message);
		this.channelSubscribe(['hello_world']);
		this.channelPublish(data.value.message);
		this.channelHistory('hello_world');
		data.reset()
	}

}
