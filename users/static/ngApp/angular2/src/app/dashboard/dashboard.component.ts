import { Component, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class DashboardComponent {
  constructor(
        private authenticationService: AuthenticationService) { }

  title = 'Dashboard';
  // getAllUsers(){
  //   this.authenticationService
  //       .getAllUsers()
  //       .subscribe(
  //         function(response){
  //           console.log('Success Subscriber');            
  //           console.log(response);
  //         },
  //         function(response){
  //           console.log('Error Subscriber');
  //           console.log(response);
  //         } 
          
  //       );
  // }
}
