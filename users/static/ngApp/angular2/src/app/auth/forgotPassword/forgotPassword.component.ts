import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';


@Component({
  selector : 'app-forgot',
  templateUrl : './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']

})
export class ForgotPasswordComponent implements OnInit{
title = 'Forgot Password';
forgotPasswordForm: FormGroup;

	constructor(
		private authenticationService : AuthenticationService,
		private route: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder,
		public snackBar: MdSnackBar
	){}

ngOnInit(){
	
	this.forgotPasswordForm = this.formBuilder.group({
		"email": ['', Validators.compose([Validators.required, Validators.email])]
	})

	console.log("hey");
}

	openSnackBar = function (message: string){
			this.snackBar.open(message," ", {
				duration: 5000,
			}); 
	};


	forgotPassword(){
		var userInputs = {
			email: this.forgotPasswordForm.controls['email'].value,
		};
		let that = this  
		this.authenticationService.forgotPassword(userInputs)
			.subscribe(
				function(response){
					that.openSnackBar("Email sent successfully! Kindly check your email inbox") 
				},
				function(response){
					if (response.statusText === "Bad Request") {
						that.openSnackBar("Please Enter a valid Email Address.")
					}
				}
			);
	}
}
