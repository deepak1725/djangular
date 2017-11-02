import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PubNubAngular } from 'pubnub-angular2';
import { MyOwnCustomMaterialModule} from '../material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, IAppState } from '../_store/store';
import { Constants } from '../_store/constants';
import { RouterModule, Routes }      from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";


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
  providers: [PubNubAngular],
})


export class ProtectedModule { 
  constructor(
    ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension
  ) {
    const storeEnhancers = devTools.isEnabled() ? 
    [ devTools.enhancer() ] :
    [];

    ngRedux.configureStore(rootReducer,{}, [], storeEnhancers)
  }
}


export const PROTECTEDMETHODS = [
    DashboardComponent
];