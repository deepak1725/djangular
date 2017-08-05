import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgotPassword/forgotPassword.component';

@NgModule({
  declarations: [
    RegisterComponent,
    ForgotPasswordComponent,
    LoginComponent
  ],
  imports: [
    FormsModule
  ],
  providers: [],
})
export class AuthModule { 

}
export const AuthMethods = [ForgotPasswordComponent, LoginComponent, RegisterComponent];