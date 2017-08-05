import { RouterModule, Routes }   from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgotPassword/forgotPassword.component';
import { AuthModule, AuthMethods } from './auth/auth.module';
import { AuthComponent } from './auth/auth.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
// import { ModuleWithProviders } from '@angular/core';



const appRoutes : Routes = [
    { path: 'base', component: AppComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component : RegisterComponent},
    { path: 'forgot-password', component : ForgotPasswordComponent},
    // { 
    //     path: '', 
    //     component: AuthComponent,
    //     children: [
    //         { path: 'login', component : LoginComponent},
    //         { path: 'register', component : RegisterComponent}
    //     ]
    // },
    // { path: '**', module : PageNotFoundComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports : [
        RouterModule
    ]
})
export class MainRouterModule{}
export const routingMethods = [AuthMethods];
