"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var router_1 = require("@angular/router");
var auth_module_1 = require("./auth/auth.module");
var auth_component_1 = require("./auth/auth.component");
var core_1 = require("@angular/core");
var pageNotFound_component_1 = require("./404/pageNotFound.component");
// import { ModuleWithProviders } from '@angular/core';
var dashboard_component_1 = require("./dashboard/dashboard.component");
var forgotConfirm_component_1 = require("./auth/forgotConfirm/forgotConfirm.component");
var register_component_1 = require("./auth/register/register.component");
var login_component_1 = require("./auth/login/login.component");
var forgotPassword_component_1 = require("./auth/forgotPassword/forgotPassword.component");
var changePassword_component_1 = require("./auth/changePassword/changePassword.component");
var auth_guard_service_1 = require("./auth-guard.service");
exports.APPROUTES = [
    {
        path: '', component: auth_component_1.AuthComponent, children: [
            { path: 'login', component: login_component_1.LoginComponent },
            { path: 'register', component: register_component_1.RegisterComponent },
        ]
    },
    { path: 'forgot-password', component: forgotPassword_component_1.ForgotPasswordComponent },
    { path: 'change-password', component: changePassword_component_1.ChangePasswordComponent },
    { path: 'reset/:uid/:token', component: forgotConfirm_component_1.ForgotConfirmComponent },
    {
        path: 'dashboard',
        component: dashboard_component_1.DashboardComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    { path: '**', component: pageNotFound_component_1.PageNotFoundComponent }
];
exports.routing = router_1.RouterModule.forRoot(exports.APPROUTES);
var MainRouterModule = /** @class */ (function () {
    function MainRouterModule() {
    }
    MainRouterModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(exports.APPROUTES, { enableTracing: false })
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], MainRouterModule);
    return MainRouterModule;
}());
exports.MainRouterModule = MainRouterModule;
exports.routingMethods = [auth_module_1.AuthMethods, pageNotFound_component_1.PageNotFoundComponent, dashboard_component_1.DashboardComponent];
