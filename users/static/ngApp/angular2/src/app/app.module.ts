import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routingMethods,MainRouterModule} from './app-routing.module';
import {UserService} from './_services/user.service';
import {AuthenticationService} from './_services/authentication.service';
import { HttpModule } from '@angular/http';
import {MyOwnCustomMaterialModule} from './material.module';
import 'hammerjs';
import { AuthGuard }                from './auth-guard.service';
import { FlexLayoutModule } from "@angular/flex-layout";
import {DashboardComponent} from './protected/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';


@NgModule({
	declarations: [
		routingMethods,
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		MyOwnCustomMaterialModule,
		HttpModule,
		FlexLayoutModule,
		MainRouterModule,
		FormsModule
		
		],
	providers: [UserService, AuthenticationService, AuthGuard],
	bootstrap: [AppComponent]
})
export class AppModule { }
