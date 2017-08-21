import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { ChangePasswordComponent } from './changePassword/changePassword.component';
import { AuthComponent } from './auth.component';
import {ForgotConfirmComponent} from './forgotConfirm/forgotConfirm.component';



@NgModule({
  declarations: [
    RegisterComponent,
    ForgotPasswordComponent,
    LoginComponent,
    ChangePasswordComponent,
    AuthComponent,
    ForgotConfirmComponent
  ],
  imports: [
    FormsModule
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