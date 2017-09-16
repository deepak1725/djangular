"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var user_service_1 = require("./_services/user.service");
var authentication_service_1 = require("./_services/authentication.service");
var http_1 = require("@angular/http");
var material_module_1 = require("./material.module");
require("hammerjs");
var auth_guard_service_1 = require("./auth-guard.service");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                app_routing_module_1.routingMethods,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.ReactiveFormsModule,
                app_routing_module_1.MainRouterModule,
                http_1.HttpModule,
                material_module_1.MyOwnCustomMaterialModule,
            ],
            providers: [user_service_1.UserService, authentication_service_1.AuthenticationService, auth_guard_service_1.AuthGuard],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
