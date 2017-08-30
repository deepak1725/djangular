import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainRouterModule, routingMethods } from './app-routing.module';
import {UserService} from './_services/user.service';
import {AuthenticationService} from './_services/authentication.service';
import { Http} from '@angular/http';
import { HttpModule } from '@angular/http';
import {MyOwnCustomMaterialModule} from './material.module';
import 'hammerjs';
import { AuthGuard }                from './auth-guard.service';



@NgModule({
  declarations: [
    AppComponent,
    routingMethods
  ],
  imports: [
    BrowserModule,
    MainRouterModule,
    HttpModule,
    MyOwnCustomMaterialModule,
    ReactiveFormsModule,
    ],
  providers: [UserService, AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
