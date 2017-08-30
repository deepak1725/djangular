import { Injectable }     from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
	constructor(
		private authService: AuthenticationService,
		private router: Router
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		let url: string = state.url;
		console.log('AuthGuard#canActivate called');
		return this.checkLogin(url);
	}

	checkLogin(url: string): boolean {
		if (this.authService.isLoggedIn && localStorage.getItem('currentUser')) { 
			return true; 
		}

		// Store the attempted URL for redirecting
		this.authService.redirectUrl = url;

		// Navigate to the login page with extras
		this.router.navigate(['login']);
		return false;
	}
}