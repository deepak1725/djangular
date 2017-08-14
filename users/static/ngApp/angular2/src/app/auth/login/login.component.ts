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
  addForm: FormGroup;


  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
		private authenticationService: AuthenticationService,
		public snackBar: MdSnackBar
	) { }

	ngOnInit() {
		this.addForm = this.formBuilder.group({
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
		console.log(message);
		this.snackBar.open(message," ", {
			duration: 2000,
		}); 
	};
	
	loginUser(){
		var adduser = {
			username: this.addForm.controls['username'].value,
			password: this.addForm.controls['password'].value,    
		};

		console.log(adduser);
		let that = this;

		this.authenticationService.login(adduser.username, adduser.password)
			.subscribe(
				function(response){
					console.log(response);
					// response = response.json();
					that.openSnackBar("Successfully logged in.")

					// that.openSnackBar(response.non_field_errors)
					// this.snackBar.open("PizzaPartyComponent"," ", {
					// 	duration: 500,
					// }); 
							
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
