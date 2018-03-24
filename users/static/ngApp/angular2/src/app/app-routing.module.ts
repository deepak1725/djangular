import { RouterModule, Routes }      from '@angular/router';
import { AuthModule, AuthMethods  }  from './public/auth/auth.module';
import { AuthComponent }             from './public/auth/auth.component';
import { AppComponent }              from './app.component';
import { NgModule }                  from '@angular/core';
import { PageNotFoundComponent }     from './404/pageNotFound.component';
// import { ModuleWithProviders } from '@angular/core';
import { DashboardComponent }        from './protected/dashboard/dashboard.component';
import { ForgotConfirmComponent}     from './public/auth/forgotConfirm/forgotConfirm.component';
import { RegisterComponent }         from './public/auth/register/register.component';
import { LoginComponent }            from './public/auth/login/login.component';
import { ForgotPasswordComponent }   from './public/auth/forgotPassword/forgotPassword.component';
import { ChangePasswordComponent }   from './public/auth/changePassword/changePassword.component';
import { AuthGuard }                 from './auth-guard.service';
// import { ModuleWithProviders }       from '@angular/core';
// import { MyOwnCustomMaterialModule } from './material.module';
import { ProtectedComponent }        from './protected/protected.component';
import { PublicComponent }        from './public/public.component';

export const userName = 'general';
            
export const APPROUTES : Routes = [
    { 
        path: '', component: ProtectedComponent, canActivate: [AuthGuard], children:
        [
            { path: 'messages/:channel/:type', component: DashboardComponent },
            { path: 'messages/:channel', component: DashboardComponent },
                { path: 'messages', redirectTo: `messages/${userName}`, pathMatch: 'full' },
                { path: '', redirectTo: `messages/${userName}`, pathMatch: 'full'  },
                { path: 'dashboard', redirectTo: `messages/${userName}`, pathMatch: 'full' },
        ]  
    },
    { 
        path: '', component: PublicComponent, children:[
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
        ]
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
export const routingMethods = [AppComponent,PublicComponent, ProtectedComponent, AuthMethods, PageNotFoundComponent];
