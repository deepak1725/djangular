import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import {MdSnackBar} from '@angular/material';




@Component({
  selector : 'app-register',
  templateUrl : './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit{
title = 'Register';
loading = false;
signupForm: FormGroup;


  
constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    public snackBar: MdSnackBar

    ) { }

ngOnInit(){
this.signupForm = this.formBuilder.group({
		username: ['', Validators.required],
		password: ['', Validators.required],
		first_name: ['', Validators.required],
		last_name: ['', Validators.required],
		email: ['', Validators.required],
	})
}
 

openSnackBar = function (message){
		this.snackBar.open(message," ", {
			duration: 5000,
		}); 
	};

registerUser(){
		var userInputs = {
			username: this.signupForm.controls['username'].value,
			password1: this.signupForm.controls['password'].value,    
			password2: this.signupForm.controls['password'].value,    
			first_name: this.signupForm.controls['first_name'].value,    
			last_name: this.signupForm.controls['last_name'].value,    
			email: this.signupForm.controls['email'].value,    
		};

		console.log(userInputs);
		let that = this;

		this.authenticationService.register(userInputs)
			.subscribe(
				function(response){
					that.openSnackBar("Successfully Signed up.")							
					console.log("Success response", response)
				},
				function(response){ 
					response = response.json();
					that.openSnackBar(response[Object.keys(response)[0]])
					console.log("Error happened", response )
				}
			);
    }
        
}
