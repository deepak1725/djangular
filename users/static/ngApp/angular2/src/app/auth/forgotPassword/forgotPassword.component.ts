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
		console.log("Welcome to forgot password")
		this.forgotPasswordForm = this.formBuilder.group({
			email: ['', Validators.required],
		})
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
					that.openSnackBar("Email sent Success. Kindly check your email address.") 
					console.log("Success response", response)
				},
				function(response){
					that.openSnackBar(response[Object.keys(response)[0]])
					console.log("Error happened", response )
				}
			);
	}
}
