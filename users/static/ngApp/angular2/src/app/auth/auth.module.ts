import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgetPassword/forgetPassword.component';

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
export class AuthModule { }
