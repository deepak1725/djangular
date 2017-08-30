import { RouterModule, Routes }     from '@angular/router';
import { AuthModule, AuthMethods  } from './auth/auth.module';
import { AuthComponent }            from './auth/auth.component';
import { AppComponent }             from './app.component';
import { NgModule }                 from '@angular/core';
import { PageNotFoundComponent }    from './404/pageNotFound.component';
// import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent }       from './dashboard/dashboard.component';
import {ForgotConfirmComponent}     from './auth/forgotConfirm/forgotConfirm.component';
import { RegisterComponent }        from './auth/register/register.component';
import { LoginComponent }           from './auth/login/login.component';
import { ForgotPasswordComponent }  from './auth/forgotPassword/forgotPassword.component';
import { ChangePasswordComponent }  from './auth/changePassword/changePassword.component';
import { AuthGuard }                from './auth-guard.service';


const APPROUTES : Routes = [
    { 
        path: '', component: AuthComponent, children:
        [
            { path: 'login', component: LoginComponent },
            { path: 'register', component : RegisterComponent},            
        ]
    },
    { path: 'forgot-password', component : ForgotPasswordComponent },
    { path: 'change-password', component : ChangePasswordComponent },
    { path: 'reset/:uid/:token', component: ForgotConfirmComponent },
    
    {   
        path: 'dashboard', 
        component : DashboardComponent, 
        canActivate: [AuthGuard]
    },
    
    { path: '**', component : PageNotFoundComponent, }
]

@NgModule({
    imports: [
        RouterModule.forRoot(APPROUTES,
            { enableTracing: false }
        )
    ],
    exports : [
        RouterModule
    ]
})
export class MainRouterModule{}
export const routingMethods = [AuthMethods, PageNotFoundComponent, DashboardComponent];
