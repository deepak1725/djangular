import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector : 'app-forgot',
  templateUrl : './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']

})
export class ForgotPasswordComponent implements OnInit{
title = 'Forgot Password';
ngOnInit(){
	console.log("Welcome to forgot password")
}
constructor(private authenticationService : AuthenticationService){}


forgott(details:any){
	console.log(details);
  this.authenticationService.forgotPassword(details.email)
        .subscribe(
          function(response){ 
              console.log("Success response", response)
              },
          function(response){ console.log("Error happened", response )}
          );
  }
}
