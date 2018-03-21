import { UserService } from './../../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material';




@Component({
 	selector : 'app-register',
  	templateUrl : './register.component.html',
  	styleUrls: ['./register.component.css'],
	providers: [UserService]

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
	public snackBar: MatSnackBar,
	private UserServicee: UserService,
	

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
 

openSnackBar = function (message:string){
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


		this.authenticationService.register(userInputs)
			.subscribe(
				(response) => {
					
					let add = this.UserServicee.addDirectChannelDetails(response.user.pk, response.user.username, response.user.pk)
						.subscribe(() => this.openSnackBar("Successfully Signed up."))
					this.router.navigate([`/login`]);
					

				},
				(response) => { 
					response = response.json();
					this.openSnackBar(response[Object.keys(response)[0]])
					console.log("Error happened", response )
				}
			);
    }
        
}
