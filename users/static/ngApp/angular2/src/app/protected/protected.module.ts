import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PubNubAngular } from 'pubnub-angular2';
import {MyOwnCustomMaterialModule} from '../material.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [],
  imports: [    
    BrowserModule,
  ],
  providers: [PubNubAngular],
})
export class ProtectedModule { 
  constructor() {}
}
export const PROTECTEDMETHODS = [
    DashboardComponent
];