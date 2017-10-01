import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication.service';
import { FormGroup,FormBuilder,FormControl,Validators,AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {MdSnackBar} from '@angular/material';
import { PasswordValidation } from './password.validator';


@Component({
  selector : 'app-change',
  templateUrl : './changePassword.component.html',
  styleUrls: ['./changePassword.component.css']

})
export class ChangePasswordComponent implements OnInit{
title = 'Change Password';
changePasswordForm: FormGroup;


constructor(
  private route: ActivatedRoute,
  private router: Router,
  private formBuilder: FormBuilder,
  private authenticationService: AuthenticationService,
  public snackBar: MdSnackBar
){}


ngOnInit(){
	console.log("Welcome to change password");
	this.changePasswordForm = this.formBuilder.group(
		{
			password1: ['', Validators.required],
			password2: ['', Validators.required],	
		},
		{
      		validator: PasswordValidation.MatchPassword 
		}
	);
	let	that = this;
}

openSnackBar = function (message: string){
		this.snackBar.open(message," ", {
			duration: 5000,
		}); 
	};

changePassword(){

	var userInputs = {
			new_password1: this.changePasswordForm.controls['password1'].value,
			new_password2: this.changePasswordForm.controls['password2'].value,    
		};

		let that = this;
  	// console.log(details);
  	this.authenticationService.changePassword(userInputs)
        .subscribe(
          	function(response){
				that.openSnackBar("Password successfully changed")							
 				console.log("Success response", response)
        	},
          	function(response){ 
                if (response.status === 401) {
					return that.openSnackBar("Session Expired! Kindly login again.")							
                }
                else if (response.status === 400) {
					return that.openSnackBar("Password and Confirm Password , both are required")							
                }							
				console.log("Error happened", response)
			}
          );
  	}
}


