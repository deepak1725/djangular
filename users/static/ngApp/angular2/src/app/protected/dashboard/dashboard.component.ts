import { Component, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';


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
  fakeArray = new Array(12);
  rakeArray = new Array(22);
  
}
