import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector : 'app-change',
  templateUrl : './changePassword.component.html',
  styleUrls: ['./changePassword.component.css']

})
export class ChangePasswordComponent implements OnInit{
title = 'Change Password';
ngOnInit(){
	console.log("Welcome to change password")
}
constructor(private authenticationService : AuthenticationService){}


changePassword(details:any){
	console.log(details);
  this.authenticationService.changePassword(details.password1, details.password2)
        .subscribe(
          function(response){ 
              console.log("Success response", response)
              },
          function(response){ console.log("Error happened", response )}
          );
  }
}
