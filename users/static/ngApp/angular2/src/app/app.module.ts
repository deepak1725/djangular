import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MainRouterModule, routingMethods } from './main.router.module';


@NgModule({
  declarations: [
    AppComponent,
    routingMethods
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MainRouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
