import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';
import {UserService} from '../../_services/user.service';
import { NgForm } from '@angular/forms';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import {MdSnackBar} from '@angular/material';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit{
  title = 'Login';
  loginForm: FormGroup;


  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
		private authenticationService: AuthenticationService,
		public snackBar: MdSnackBar
	) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		})
	};

	emailFormControl = new FormControl('', [
		Validators.required,
	]);
	passwordFormControl = new FormControl('', [
		Validators.required,
	]);

	openSnackBar = function (message){
		this.snackBar.open(message," ", {
			duration: 2000,
		}); 
	};
	
	loginUser(){
		var adduser = {
			username: this.loginForm.controls['username'].value,
			password: this.loginForm.controls['password'].value,    
		};

		console.log(adduser);
		let that = this;

		this.authenticationService.login(adduser.username, adduser.password)
			.subscribe(
				function(response){
					that.openSnackBar("Successfully logged in.")							
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
