import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';
import { ChangePasswordComponent } from './changePassword/changePassword.component';
import { AuthComponent } from './auth.component';
import {ForgotConfirmComponent} from './forgotConfirm/forgotConfirm.component';
import {MyOwnCustomMaterialModule} from '../../material.module';


@NgModule({
  declarations: [
    ],
  imports: [
    MyOwnCustomMaterialModule,
    
  ],
  providers: [],
})
export class AuthModule { 

}
export const AuthMethods = [
  AuthComponent,
  ChangePasswordComponent, 
  ForgotPasswordComponent, 
  LoginComponent, 
  RegisterComponent,
  ForgotConfirmComponent
];