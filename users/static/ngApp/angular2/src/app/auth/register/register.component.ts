import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication.service';




@Component({
  selector : 'app-register',
  templateUrl : './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent{
title = 'Register';
loading = false;

constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService) { }

register(details:any){
  console.log(details);
  this.authenticationService.register(details.first_name, details.last_name, details.username, details.email, details.password)
      .subscribe(
          data => {
              this.router.navigate(['dashboard']);
          },
          error => {
              this.loading = false;
          });
  
}
}
