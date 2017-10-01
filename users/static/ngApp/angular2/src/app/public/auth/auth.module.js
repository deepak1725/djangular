"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var register_component_1 = require("./register/register.component");
var login_component_1 = require("./login/login.component");
var forgotPassword_component_1 = require("./forgotPassword/forgotPassword.component");
var changePassword_component_1 = require("./changePassword/changePassword.component");
var auth_component_1 = require("./auth.component");
var forgotConfirm_component_1 = require("./forgotConfirm/forgotConfirm.component");
var material_module_1 = require("../material.module");
var router_1 = require("@angular/router");
var app_routing_module_1 = require("../app-routing.module");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        core_1.NgModule({
            declarations: [],
            imports: [
                router_1.RouterModule,
                forms_1.FormsModule,
                app_routing_module_1.MainRouterModule,
                forms_1.ReactiveFormsModule,
                material_module_1.MyOwnCustomMaterialModule
            ],
            providers: []
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
exports.AuthMethods = [
    auth_component_1.AuthComponent,
    changePassword_component_1.ChangePasswordComponent,
    forgotPassword_component_1.ForgotPasswordComponent,
    login_component_1.LoginComponent,
    register_component_1.RegisterComponent,
    forgotConfirm_component_1.ForgotConfirmComponent
];
