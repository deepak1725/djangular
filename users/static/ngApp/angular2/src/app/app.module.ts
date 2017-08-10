import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainRouterModule, routingMethods } from './main.router.module';
import {UserService} from './_services/user.service';
import {AuthenticationService} from './_services/authentication.service';
import {CustomHttp} from './_helpers/custom-http';
import { Http} from '@angular/http';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    routingMethods
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MainRouterModule,
    HttpModule
  ],
  providers: [UserService, AuthenticationService, CustomHttp],
  bootstrap: [AppComponent]
})
export class AppModule { }
