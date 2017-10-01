import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { AuthenticationService } from '../../../_services/authentication.service'
import { MdSnackBar } from '@angular/material';


@Component({
    selector: 'app-forgotConfirm',
    templateUrl : './forgotConfirm.component.html',

})
export class ForgotConfirmComponent implements OnInit{
    title = 'Enter New Password'
    forgotConfirmForm : FormGroup
    uid: any = this.route.snapshot.paramMap.get('uid');
    token: any = this.route.snapshot.paramMap.get('token');

    constructor(
        private authenticationService : AuthenticationService,
        private route: ActivatedRoute,
        private formBuilder:FormBuilder,
        public snackBar: MdSnackBar

    ) {}

    ngOnInit(){
        this.forgotConfirmForm = this.formBuilder.group({
		    password1: ['', Validators.required],
		    password2: ['', Validators.required],
        })
    }
    
    openSnackBar = function (message: string){
		this.snackBar.open(message," ", {
			duration: 5000,
		}); 
    }

    forgotConfirm(){
        var userInputs = {
            new_password1 : this.forgotConfirmForm.controls['password1'].value,
            new_password2 : this.forgotConfirmForm.controls['password2'].value,
            uid : this.uid,
            token : this.token
        }
        let that = this  
        this.authenticationService.forgotPasswordConfirm(userInputs)
            .subscribe(
                function(response){
                    that.openSnackBar("Password Successfully changed") 
                    console.log("success");
                },
                function(response){
                    var res = response.json();
                    if (response.status === 400 && res.new_password2) {
                        that.openSnackBar("Password is too easy to guess. Min 8 mixed characters")
                    }
                    if (response.status === 400 && res.token) {
                        that.openSnackBar("Token Expired. Try again.")
                    }
                   
                    console.log("error")
                }

            );  

    }
}