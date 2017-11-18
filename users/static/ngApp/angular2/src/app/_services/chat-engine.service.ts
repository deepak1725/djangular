import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PubNubAngular } from 'pubnub-angular2';
import { MatSnackBar } from '@angular/material';
import * as ChatEngineCore from 'chat-engine';

@Injectable()
export class ChatEngineService {
    ChatEngine: any;

    constructor(
        public pubnub: ChatEngineCore,
    ) {
        // this.ChatEngine = pubnub.create({
        //     publishKey: 'pub-c-4e5c8f59-8d62-4cb2-b8b2-fd1e98c674d9',
        //     subscribeKey: 'sub-c-1f3bea98-cae1-11e7-8a2d-cad296c360f6'
        // });
        // this.connect()
    }

    connect = () => {
        this.ChatEngine.connect('ian', {
            team: 'red'
        })
    
        this.ChatEngine.on('$.ready', (data) => {
            console.log('ChatEngine ready to go!');
        });
    
    
    }
    

}