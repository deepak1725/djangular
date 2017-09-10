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


@NgModule({
  declarations: [
    RegisterComponent,
    ForgotPasswordComponent,
    LoginComponent,
    ChangePasswordComponent,
    AuthComponent,
    ForgotConfirmComponent,
    routingMethods
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
  AuthComponent,
  ForgotConfirmComponent
];