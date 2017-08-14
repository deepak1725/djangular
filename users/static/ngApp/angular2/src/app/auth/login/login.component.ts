import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';

import {UserService} from '../../_services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',

})
export class LoginComponent implements OnInit{
  loading = false;
  returnUrl: string;
  title = 'Login';
  model: any = {};

  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }

  ngOnInit() {
        // reset login status
      //   this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(details: any){
  console.log(details);
  this.loading = true;
  this.authenticationService.login(details.username, details.password)
      .subscribe(
         function(response){ 
             console.log("Success response", response)
            },
         function(response){ console.log("Error happened", response )}
        );
  }
}
