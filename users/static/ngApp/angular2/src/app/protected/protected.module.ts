import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PubNubAngular } from 'pubnub-angular2';
import {MyOwnCustomMaterialModule} from '../material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgReduxModule, NgRedux,DevToolsExtension } from '@angular-redux/store';
import {rootReducer, ChatAppState, INITIAL_STATE } from '../_models/store';
import { RouterModule, Routes }      from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CounterActions } from '../_models/actions';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [    
    BrowserModule,
    MyOwnCustomMaterialModule,
    NgReduxModule,
    RouterModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [PubNubAngular, CounterActions],
})


export class ProtectedModule { 
  constructor(
    ngRedux: NgRedux<ChatAppState>,
    devTools: DevToolsExtension
  ) {
    const storeEnhancers = devTools.isEnabled() ? 
    [ devTools.enhancer() ] :
    [];

    ngRedux.configureStore(rootReducer,INITIAL_STATE, [], storeEnhancers)
  }
}


export const PROTECTEDMETHODS = [
    DashboardComponent
];