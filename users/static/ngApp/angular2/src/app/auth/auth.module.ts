import { NgModule } from '@angular/core';
import { FormsModule,    ReactiveFormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { ChangePasswordComponent } from './changePassword/changePassword.component';
import { AuthComponent } from './auth.component';
import {ForgotConfirmComponent} from './forgotConfirm/forgotConfirm.component';
import {MyOwnCustomMaterialModule} from '../material.module';
import { RouterModule } from '@angular/router';
import { routing, routingMethods, MainRouterModule } from '../app-routing.module';
import { PageNotFoundComponent }    from '../404/pageNotFound.component';
import { DashboardComponent }       from '../dashboard/dashboard.component';


@NgModule({
  declarations: [
    ],
  imports: [
    RouterModule,
    FormsModule,
    MainRouterModule,
    ReactiveFormsModule,
    MyOwnCustomMaterialModule
    
  ],
  providers: [],
})
export class AuthModule { 

}
export const AuthMethods = [
  ChangePasswordComponent, 
  ForgotPasswordComponent, 
  LoginComponent, 
  RegisterComponent,
  ForgotConfirmComponent,
  PageNotFoundComponent,
  DashboardComponent
];