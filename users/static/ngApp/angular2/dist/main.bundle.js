webpackJsonp([1],{

/***/ "./src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_gendir lazy recursive";

/***/ }),

/***/ "./src/app/404/pageNotFound.component.html":
/***/ (function(module, exports) {

module.exports = "{{title}}"

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".spacer {\n     -webkit-box-flex: 1; \n     -ms-flex: 1 1 auto; \n     flex: 1 1 auto; \n}\nform  {\n    font-size: 18px    !important;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"flex-container\" fxLayout='row' fxLayoutWrap fxLayoutGap=\"10px\">\n            <md-toolbar color=\"primary\">\n\n                <span>Djangular</span>\n                <span class=\"spacer\"></span>\n                <button md-icon-button [mdMenuTriggerFor]=\"appMenu\">\n                    <md-icon>menu</md-icon> \n                </button>\n                \n            </md-toolbar>\n\n            <md-menu #appMenu=\"mdMenu\">\n            <button md-menu-item routerLink=\"/login\"> Login </button>\n            <button md-menu-item routerLink=\"/register\"> Register </button>\n            <button md-menu-item routerLink=\"/forgot-password\"> Forgot Password</button>\n            <button md-menu-item [routerLink]=\"['/change-password']\"> Change Password </button>\n            </md-menu>\n            \n            <router-outlet>\n                <div style=\"margin-top: 10px;\"></div>\n            </router-outlet>\n                \n</div>\n"

/***/ }),

/***/ "./src/app/auth/auth.component.html":
/***/ (function(module, exports) {

module.exports = "    <md-card class=\"card-container\">\n        <md-tab-group>\n            <md-tab label=\"LOGIN\" class=\"tablabels\"> \n                <app-login></app-login>\n            </md-tab>\n            <md-tab label=\"REGISTER\" [routerLink]=\"['/register']\">\n                <app-register></app-register>\n            </md-tab>     \n        </md-tab-group>\n    </md-card>        "

/***/ }),

/***/ "./src/app/auth/changePassword/changePassword.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/auth/changePassword/changePassword.component.html":
/***/ (function(module, exports) {

module.exports = "\t\t\n<md-card>\n   <md-toolbar>\n        <md-card-title>\n\t        {{this.title}}\n        </md-card-title>\n    </md-toolbar>\n        <!-- Inputs -->\n    <md-card-content>\n        <form [formGroup]=\"changePasswordForm\">\n\t\t\t<p>\n\t\t\t<md-input-container>\n\t\t\t\t<input mdInput placeholder=\"Password\" type=\"password\" formControlName=\"password1\">\n\t\t\t\t<md-error >\n\t\t\t\t\tPlease enter your <strong>password</strong>\n\t\t\t\t</md-error>\n\t\t\t</md-input-container>\n\t\t\t</p>\n\t\t\t<p>\n\t\t\t\t<md-input-container>\n\t\t\t\t\t<input mdInput placeholder=\"Confirm Password\" type=\"password\" formControlName=\"password2\" md-maxlength=\"10\">\n\t\t\t\t\t<md-error *ngIf=\"changePasswordForm.controls['password2'].hasError('required')\">\n\t\t\t\t\t\tPlease confirm your <strong>password</strong>\n\t\t\t\t\t</md-error>\n\t\t\t\t\t<md-error *ngIf=\"changePasswordForm.controls['password2'].hasError('MatchPassword')\" >\n\t\t\t\t\t\tPassword and Confirm Password mismatch.\n\t\t\t\t\t</md-error>\n\t\t\t\t</md-input-container>\n\t\t\t</p>\n            <button mdInput type=\"submit\" md-raised-button color=\"primary\" [disabled]=\"!changePasswordForm.valid\" (click)=\"changePassword()\">Submit</button>\n        </form>\n    </md-card-content>\n        \n    <md-card-footer>\n        <!-- Footer -->\n         <!-- <small> All Copyright nothing reserved| Free to copy n disctribute.</small>  -->\n    </md-card-footer>\n</md-card>\t\t"

/***/ }),

/***/ "./src/app/auth/forgotConfirm/forgotConfirm.component.html":
/***/ (function(module, exports) {

module.exports = "    <md-card>\n        <md-toolbar>\n            <md-card-title>\n                {{this.title}}\n            </md-card-title>\n        </md-toolbar>\n            <!-- Inputs -->\n        <md-card-content>\n            <form [formGroup]=\"forgotConfirmForm\">\n            \n                    <p>\n                        <md-input-container class=\"col-md-12 form-group\">\n                            <input mdInput type=\"password1\" placeholder=\"Password\" formControlName=\"password1\">\n                            <md-error>\n                                Please enter your <strong>Password</strong>\n                            </md-error>\n                        </md-input-container>\n                    </p>\n                    <p>\n                        <md-input-container class=\"col-md-12 form-group\">\n                            <input mdInput type=\"password2\" placeholder=\"Confirm Password\" formControlName=\"password2\">\n                            <md-error>\n                                Please confirm your <strong>Password</strong>\n                            </md-error>\n                        </md-input-container>\n                    </p>\n                    <div>\n                        <button mdInput style=\"margin:20px 15px\" type=\"submit\" md-raised-button color=\"primary\" (click)=\"forgotConfirm()\">Submit</button>\n                    </div>\n            </form>\n        </md-card-content>\n        <md-card-footer class=\"text-center\">\n            <!-- Footer -->\n            <a routerLink=\"/login\" > <small>Login </small></a>|\n            <a routerLink=\"/register\" > <small>Register </small></a>\n            <!-- <small> Login.</small>   -->\n        </md-card-footer>\n    </md-card>\n        "

/***/ }),

/***/ "./src/app/auth/forgotPassword/forgotPassword.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/auth/forgotPassword/forgotPassword.component.html":
/***/ (function(module, exports) {

module.exports = "<md-card>\n    <md-toolbar>\n        <md-card-title>\n\t        {{this.title}}\n        </md-card-title>\n    </md-toolbar>\n        <!-- Inputs -->\n    <md-card-content>\n        <form [formGroup]=\"forgotPasswordForm\">\n        \n                <p>\n                    <md-input-container class=\"col-md-12 form-group\">\n                        <input mdInput type=\"email\" placeholder=\"Email\" formControlName=\"email\">\n                        <md-error>\n                            Please enter your <strong>Email</strong>\n                        </md-error>\n                    </md-input-container>\n                </p>\n                <div>\n                    <button mdInput [disabled]=!forgotPasswordForm.valid type=\"submit\" md-raised-button color=\"primary\" (click)=\"forgotPassword()\">Submit</button>\n                </div>\n        </form>\n    </md-card-content>\n    <md-card-footer class=\"text-center\">\n        <!-- Footer -->\n        <a routerLink=\"/login\" > <small>Login </small></a>|\n        <a routerLink=\"/register\" > <small>Register </small></a>\n          <!-- <small> Login.</small>   -->\n    </md-card-footer>\n</md-card>"

/***/ }),

/***/ "./src/app/auth/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "    <md-toolbar>\n        <md-card-title>\n\t        {{this.title}}\n        </md-card-title>\n    </md-toolbar>\n        <!-- Inputs -->\n    <md-card-content>\n        <form [formGroup]=\"loginForm\">\n                <p> \n                    <md-input-container>\n                        <input mdInput placeholder=\"Username\" formControlName=\"username\">\n                        <md-error>\n                            Please enter your <strong>username</strong>\n                        </md-error>\n                    </md-input-container>\n                </p>\n        \n                <p>\n                    <md-input-container>\n                        <input mdInput type=\"password\" placeholder=\"Password\" formControlName=\"password\">\n                        <md-error>\n                            Please enter your <strong>password</strong>\n                        </md-error>\n                    </md-input-container>\n                </p>\n                <div>\n                    <button mdInput [disabled]=!loginForm.valid type=\"submit\" md-raised-button color=\"primary\" (click)=\"loginUser()\">Submit</button>\n                </div>\n        </form>\n    </md-card-content>\n    <md-card-footer class=\"text-center\">\n        <!-- Footer -->\n        <a routerLink=\"/register\"> <small>REGISTER &nbsp;</small></a>|\n        <a routerLink=\"/forgot-password\"> <small>FORGOT PASSWORD </small></a>\n    </md-card-footer>\n\n"

/***/ }),

/***/ "./src/app/auth/register/register.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./src/app/auth/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "\n<md-toolbar>\n\t<md-card-title>\n\t\t{{this.title}}\n\t</md-card-title>\n</md-toolbar>\n\t<!-- Inputs -->\n<md-card-content>\n\t\t<form [formGroup]=\"signupForm\">\n\t\t\t\n\t\t\t<p>\n\t\t\t\t<md-input-container>\n\t\t\t\t\t<input mdInput placeholder=\"Username\" formControlName=\"username\">\n\t\t\t\t\t<md-error >\n\t\t\t\t\t\tPlease enter your <strong>username</strong>\n\t\t\t\t\t</md-error>\n\t\t\t\t</md-input-container>\n\t\t\t</p>\n\t\t\t\t<table cellspacing=\"0\">\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<md-input-container>\n\t\t\t\t\t\t\t\t<input mdInput  placeholder=\"First Name\" formControlName=\"first_name\">\n\t\t\t\t\t\t\t\t<md-error>\n\t\t\t\t\t\t\t\t\tPlease enter your <strong>First Name</strong>\n\t\t\t\t\t\t\t\t</md-error>\n\t\t\t\t\t\t\t</md-input-container>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t\t<td>\t\n\t\t\t\t\t\t\t<md-input-container>\n\t\t\t\t\t\t\t\t<input mdInput placeholder=\"Last Name\" formControlName=\"last_name\">\n\t\t\t\t\t\t\t\t<md-error>\n\t\t\t\t\t\t\t\t\tPlease enter your <strong>Last Name</strong>\n\t\t\t\t\t\t\t\t</md-error>\n\t\t\t\t\t\t\t</md-input-container>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</table>\n\t\t\t<p>\n\t\t\t\t<md-input-container>\n\t\t\t\t\t<input type=\"email\" mdInput placeholder=\"Email\" formControlName=\"email\">\n\t\t\t\t\t<md-error>\n\t\t\t\t\t\tPlease enter your <strong>email</strong>\n\t\t\t\t\t</md-error>\n\t\t\t\t</md-input-container>\n\t\t\t</p>\n\t\t\n\t\t\t<p>\n\t\t\t\t<md-input-container>\n\t\t\t\t\t<input mdInput type=\"password\" placeholder=\"Password\" formControlName=\"password\">\n\t\t\t\t\t<md-error>\n\t\t\t\t\t\tPlease enter your <strong>password</strong>\n\t\t\t\t\t</md-error>\n\t\t\t\t</md-input-container>\n\t\t\t</p>\n\t\t\t<div >\n\t\t\t\t<button mdInput [disabled]=!signupForm.valid  type=\"submit\" md-raised-button color=\"primary\" (click)=\"registerUser()\">Submit</button>\n\t\t\t</div>\n\t\t</form>\n</md-card-content>\n\t\n\t<md-card-footer class=\"text-center\">\n        <a routerLink=\"/login\"> <small>login &nbsp;</small></a>\n    </md-card-footer>"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "Welcome to Dashboard\n\n<a [routerLink]=\"['/dashboard']\">Dashboard</a>"

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/@angular/core.es5.js
var core_es5 = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");

// EXTERNAL MODULE: ./node_modules/@angular/platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js + 1 modules
var platform_browser_dynamic_es5 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");

// EXTERNAL MODULE: ./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js
var platform_browser_es5 = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");

// EXTERNAL MODULE: ./node_modules/@angular/forms/@angular/forms.es5.js
var forms_es5 = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");

// CONCATENATED MODULE: ./src/app/app.component.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var app_component_AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'App Component';
    }
    AppComponent = __decorate([
        Object(core_es5["o" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=app.component.js.map
// EXTERNAL MODULE: ./node_modules/@angular/router/@angular/router.es5.js
var router_es5 = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");

// CONCATENATED MODULE: ./src/app/auth/auth.component.ts
var auth_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var auth_component_AuthComponent = /** @class */ (function () {
    function AuthComponent() {
    }
    AuthComponent = auth_component___decorate([
        Object(core_es5["o" /* Component */])({
            selector: 'app-auth',
            template: __webpack_require__("./src/app/auth/auth.component.html"),
        })
    ], AuthComponent);
    return AuthComponent;
}());

//# sourceMappingURL=auth.component.js.map
// CONCATENATED MODULE: ./src/app/404/pageNotFound.component.ts
var pageNotFound_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var pageNotFound_component_PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent() {
        this.title = "Page Not Found";
    }
    PageNotFoundComponent = pageNotFound_component___decorate([
        Object(core_es5["o" /* Component */])({
            template: __webpack_require__("./src/app/404/pageNotFound.component.html")
        })
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());

//# sourceMappingURL=pageNotFound.component.js.map
// EXTERNAL MODULE: ./node_modules/@angular/http/@angular/http.es5.js
var http_es5 = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");

// EXTERNAL MODULE: ./node_modules/rxjs/add/operator/map.js
var map = __webpack_require__("./node_modules/rxjs/add/operator/map.js");
var map_default = /*#__PURE__*/__webpack_require__.n(map);

// EXTERNAL MODULE: ./node_modules/rxjs/add/operator/do.js
var operator_do = __webpack_require__("./node_modules/rxjs/add/operator/do.js");
var do_default = /*#__PURE__*/__webpack_require__.n(operator_do);

// CONCATENATED MODULE: ./src/app/_services/authentication.service.ts
var authentication_service___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import {Observable} from 'rxjs/Rx';


var authentication_service_AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, router) {
        this.http = http;
        this.router = router;
        // private beforeRequest(): void {
        // this.notifyService.showPreloader();
        // }
        // private afterRequest(): void {
        // this.notifyService.hidePreloader();
        // }
        this.isLoggedIn = false;
    }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post('/api/login/', { username: username, password: password })
            .map(function (response) {
            _this.isLoggedIn = true;
            var user = response.json();
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            _this.router.navigate(['dashboardd']);
            if (_this.redirectUrl) {
                _this.router.navigate([_this.redirectUrl]);
            }
            return user;
        });
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        return this.http.post('/api/register/', {})
            .map(function (response) {
            // remove user from local storage to log user out
            localStorage.removeItem('currentUser');
            _this.isLoggedIn = false;
            _this.router.navigate(['login']);
        });
    };
    AuthenticationService.prototype.register = function (userInputs) {
        return this.http.post('/api/register/', userInputs)
            .map(function (response) {
            var user = response.json();
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        });
    };
    AuthenticationService.prototype.forgotPassword = function (userInputs) {
        return this.http.post('/api/reset-password/', userInputs)
            .map(function (response) {
            var user = response.json();
            return user;
        });
    };
    AuthenticationService.prototype.getAuthHeader = function () {
        this.options = new http_es5["d" /* RequestOptions */]();
        if (this.options.headers == null) {
            this.options.headers = new http_es5["a" /* Headers */]();
        }
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new http_es5["a" /* Headers */]({ 'Authorization': 'JWT ' + currentUser.token });
    };
    AuthenticationService.prototype.changePassword = function (userInputs) {
        this.getAuthHeader();
        return this.http.post('/api/change-password', userInputs, { headers: this.headers })
            .map(function (response) {
            var responsee = response.json();
            console.log(response);
            return responsee;
        });
    };
    AuthenticationService.prototype.forgotPasswordConfirm = function (userInputs) {
        return this.http.post('/api/reset/password/confirm', userInputs)
            .map(function (response) {
            var responsee = response.json();
            console.log("response");
            return responsee;
        });
    };
    AuthenticationService = authentication_service___decorate([
        Object(core_es5["C" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof http_es5["b" /* Http */] !== "undefined" && http_es5["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof router_es5["b" /* Router */] !== "undefined" && router_es5["b" /* Router */]) === "function" && _b || Object])
    ], AuthenticationService);
    return AuthenticationService;
    var _a, _b;
}());

//# sourceMappingURL=authentication.service.js.map
// CONCATENATED MODULE: ./src/app/dashboard/dashboard.component.ts
var dashboard_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var dashboard_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var dashboard_component_DashboardComponent = /** @class */ (function () {
    function DashboardComponent(authenticationService) {
        this.authenticationService = authenticationService;
        this.title = 'Dashboard';
    }
    DashboardComponent = dashboard_component___decorate([
        Object(core_es5["o" /* Component */])({
            selector: 'app-dashboard',
            template: __webpack_require__("./src/app/dashboard/dashboard.component.html"),
        }),
        dashboard_component___metadata("design:paramtypes", [typeof (_a = typeof authentication_service_AuthenticationService !== "undefined" && authentication_service_AuthenticationService) === "function" && _a || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a;
}());

//# sourceMappingURL=dashboard.component.js.map
// EXTERNAL MODULE: ./node_modules/@angular/material/@angular/material.es5.js + 12 modules
var material_es5 = __webpack_require__("./node_modules/@angular/material/@angular/material.es5.js");

// CONCATENATED MODULE: ./src/app/auth/forgotConfirm/forgotConfirm.component.ts
var forgotConfirm_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var forgotConfirm_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var forgotConfirm_component_ForgotConfirmComponent = /** @class */ (function () {
    function ForgotConfirmComponent(authenticationService, route, formBuilder, snackBar) {
        this.authenticationService = authenticationService;
        this.route = route;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.title = 'Enter New Password';
        this.uid = this.route.snapshot.paramMap.get('uid');
        this.token = this.route.snapshot.paramMap.get('token');
        this.openSnackBar = function (message) {
            this.snackBar.open(message, " ", {
                duration: 5000,
            });
        };
    }
    ForgotConfirmComponent.prototype.ngOnInit = function () {
        this.forgotConfirmForm = this.formBuilder.group({
            password1: ['', forms_es5["j" /* Validators */].required],
            password2: ['', forms_es5["j" /* Validators */].required],
        });
    };
    ForgotConfirmComponent.prototype.forgotConfirm = function () {
        var userInputs = {
            new_password1: this.forgotConfirmForm.controls['password1'].value,
            new_password2: this.forgotConfirmForm.controls['password2'].value,
            uid: this.uid,
            token: this.token
        };
        var that = this;
        this.authenticationService.forgotPasswordConfirm(userInputs)
            .subscribe(function (response) {
            that.openSnackBar("Password Successfully changed");
            console.log("success");
        }, function (response) {
            var res = response.json();
            if (response.status === 400 && res.new_password2) {
                that.openSnackBar("Password is too easy to guess. Min 8 mixed characters");
            }
            if (response.status === 400 && res.token) {
                that.openSnackBar("Token Expired. Try again.");
            }
            console.log("error");
        });
    };
    ForgotConfirmComponent = forgotConfirm_component___decorate([
        Object(core_es5["o" /* Component */])({
            selector: 'app-forgotConfirm',
            template: __webpack_require__("./src/app/auth/forgotConfirm/forgotConfirm.component.html"),
        }),
        forgotConfirm_component___metadata("design:paramtypes", [typeof (_a = typeof authentication_service_AuthenticationService !== "undefined" && authentication_service_AuthenticationService) === "function" && _a || Object, typeof (_b = typeof router_es5["a" /* ActivatedRoute */] !== "undefined" && router_es5["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof forms_es5["b" /* FormBuilder */] !== "undefined" && forms_es5["b" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof material_es5["h" /* MdSnackBar */] !== "undefined" && material_es5["h" /* MdSnackBar */]) === "function" && _d || Object])
    ], ForgotConfirmComponent);
    return ForgotConfirmComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=forgotConfirm.component.js.map
// CONCATENATED MODULE: ./src/app/auth/register/register.component.ts
var register_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var register_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var register_component_RegisterComponent = /** @class */ (function () {
    function RegisterComponent(route, router, formBuilder, authenticationService, snackBar) {
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.authenticationService = authenticationService;
        this.snackBar = snackBar;
        this.title = 'Register';
        this.loading = false;
        this.openSnackBar = function (message) {
            this.snackBar.open(message, " ", {
                duration: 5000,
            });
        };
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.signupForm = this.formBuilder.group({
            username: ['', forms_es5["j" /* Validators */].required],
            password: ['', forms_es5["j" /* Validators */].required],
            first_name: ['', forms_es5["j" /* Validators */].required],
            last_name: ['', forms_es5["j" /* Validators */].required],
            email: ['', forms_es5["j" /* Validators */].required],
        });
    };
    RegisterComponent.prototype.registerUser = function () {
        var userInputs = {
            username: this.signupForm.controls['username'].value,
            password1: this.signupForm.controls['password'].value,
            password2: this.signupForm.controls['password'].value,
            first_name: this.signupForm.controls['first_name'].value,
            last_name: this.signupForm.controls['last_name'].value,
            email: this.signupForm.controls['email'].value,
        };
        console.log(userInputs);
        var that = this;
        this.authenticationService.register(userInputs)
            .subscribe(function (response) {
            that.openSnackBar("Successfully Signed up.");
            console.log("Success response", response);
        }, function (response) {
            response = response.json();
            that.openSnackBar(response[Object.keys(response)[0]]);
            console.log("Error happened", response);
        });
    };
    RegisterComponent = register_component___decorate([
        Object(core_es5["o" /* Component */])({
            selector: 'app-register',
            template: __webpack_require__("./src/app/auth/register/register.component.html"),
            styles: [__webpack_require__("./src/app/auth/register/register.component.css")]
        }),
        register_component___metadata("design:paramtypes", [typeof (_a = typeof router_es5["a" /* ActivatedRoute */] !== "undefined" && router_es5["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof router_es5["b" /* Router */] !== "undefined" && router_es5["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof forms_es5["b" /* FormBuilder */] !== "undefined" && forms_es5["b" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof authentication_service_AuthenticationService !== "undefined" && authentication_service_AuthenticationService) === "function" && _d || Object, typeof (_e = typeof material_es5["h" /* MdSnackBar */] !== "undefined" && material_es5["h" /* MdSnackBar */]) === "function" && _e || Object])
    ], RegisterComponent);
    return RegisterComponent;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=register.component.js.map
// CONCATENATED MODULE: ./src/app/auth/login/login.component.ts
var login_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var login_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var login_component_LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, authenticationService, snackBar) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.snackBar = snackBar;
        this.title = 'Login';
        this.emailFormControl = new forms_es5["c" /* FormControl */]('', [
            forms_es5["j" /* Validators */].required,
        ]);
        this.passwordFormControl = new forms_es5["c" /* FormControl */]('', [
            forms_es5["j" /* Validators */].required,
        ]);
        this.openSnackBar = function (message) {
            this.snackBar.open(message, " ", {
                duration: 2000,
            });
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', forms_es5["j" /* Validators */].required],
            password: ['', forms_es5["j" /* Validators */].required],
        });
    };
    ;
    LoginComponent.prototype.loginUser = function () {
        var adduser = {
            username: this.loginForm.controls['username'].value,
            password: this.loginForm.controls['password'].value,
        };
        var that = this;
        this.authenticationService.login(adduser.username, adduser.password)
            .subscribe(function (response) {
            that.openSnackBar("Successfully logged in.");
        }, function (response) {
            response = response.json();
            that.openSnackBar(response[Object.keys(response)[0]]);
            console.log("Error happened", response);
        });
    };
    LoginComponent = login_component___decorate([
        Object(core_es5["o" /* Component */])({
            selector: 'app-login',
            template: __webpack_require__("./src/app/auth/login/login.component.html"),
        }),
        login_component___metadata("design:paramtypes", [typeof (_a = typeof forms_es5["b" /* FormBuilder */] !== "undefined" && forms_es5["b" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof router_es5["a" /* ActivatedRoute */] !== "undefined" && router_es5["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof router_es5["b" /* Router */] !== "undefined" && router_es5["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof authentication_service_AuthenticationService !== "undefined" && authentication_service_AuthenticationService) === "function" && _d || Object, typeof (_e = typeof material_es5["h" /* MdSnackBar */] !== "undefined" && material_es5["h" /* MdSnackBar */]) === "function" && _e || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=login.component.js.map
// CONCATENATED MODULE: ./src/app/auth/forgotPassword/forgotPassword.component.ts
var forgotPassword_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var forgotPassword_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var forgotPassword_component_ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent(authenticationService, route, router, formBuilder, snackBar) {
        this.authenticationService = authenticationService;
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.snackBar = snackBar;
        this.title = 'Forgot Password';
        this.openSnackBar = function (message) {
            this.snackBar.open(message, " ", {
                duration: 5000,
            });
        };
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        console.log("Welcome to forgot password");
        this.forgotPasswordForm = this.formBuilder.group({
            email: ['', forms_es5["j" /* Validators */].required],
        });
    };
    ForgotPasswordComponent.prototype.forgotPassword = function () {
        var userInputs = {
            email: this.forgotPasswordForm.controls['email'].value,
        };
        var that = this;
        this.authenticationService.forgotPassword(userInputs)
            .subscribe(function (response) {
            that.openSnackBar("Email sent Success. Kindly check your email address.");
            console.log("Success response", response);
        }, function (response) {
            that.openSnackBar(response[Object.keys(response)[0]]);
            console.log("Error happened", response);
        });
    };
    ForgotPasswordComponent = forgotPassword_component___decorate([
        Object(core_es5["o" /* Component */])({
            selector: 'app-forgot',
            template: __webpack_require__("./src/app/auth/forgotPassword/forgotPassword.component.html"),
            styles: [__webpack_require__("./src/app/auth/forgotPassword/forgotPassword.component.css")]
        }),
        forgotPassword_component___metadata("design:paramtypes", [typeof (_a = typeof authentication_service_AuthenticationService !== "undefined" && authentication_service_AuthenticationService) === "function" && _a || Object, typeof (_b = typeof router_es5["a" /* ActivatedRoute */] !== "undefined" && router_es5["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof router_es5["b" /* Router */] !== "undefined" && router_es5["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof forms_es5["b" /* FormBuilder */] !== "undefined" && forms_es5["b" /* FormBuilder */]) === "function" && _d || Object, typeof (_e = typeof material_es5["h" /* MdSnackBar */] !== "undefined" && material_es5["h" /* MdSnackBar */]) === "function" && _e || Object])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=forgotPassword.component.js.map
// CONCATENATED MODULE: ./src/app/auth/changePassword/password.validator.ts
var PasswordValidation = /** @class */ (function () {
    function PasswordValidation() {
    }
    PasswordValidation.MatchPassword = function (AC) {
        var password = AC.get('password1').value; // to get value in input tag
        var confirmPassword = AC.get('password2').value; // to get value in input tag
        if (password != confirmPassword) {
            AC.get('password2').setErrors({ MatchPassword: true });
        }
        else {
            return null;
        }
    };
    return PasswordValidation;
}());

//# sourceMappingURL=password.validator.js.map
// CONCATENATED MODULE: ./src/app/auth/changePassword/changePassword.component.ts
var changePassword_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var changePassword_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var changePassword_component_ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(route, router, formBuilder, authenticationService, snackBar) {
        this.route = route;
        this.router = router;
        this.formBuilder = formBuilder;
        this.authenticationService = authenticationService;
        this.snackBar = snackBar;
        this.title = 'Change Password';
        this.openSnackBar = function (message) {
            this.snackBar.open(message, " ", {
                duration: 5000,
            });
        };
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        console.log("Welcome to change password");
        this.changePasswordForm = this.formBuilder.group({
            password1: ['', forms_es5["j" /* Validators */].required],
            password2: ['', forms_es5["j" /* Validators */].required],
        }, {
            validator: PasswordValidation.MatchPassword
        });
        var that = this;
    };
    ChangePasswordComponent.prototype.changePassword = function () {
        var userInputs = {
            new_password1: this.changePasswordForm.controls['password1'].value,
            new_password2: this.changePasswordForm.controls['password2'].value,
        };
        var that = this;
        // console.log(details);
        this.authenticationService.changePassword(userInputs)
            .subscribe(function (response) {
            that.openSnackBar("Password successfully changed");
            console.log("Success response", response);
        }, function (response) {
            if (response.status === 401) {
                return that.openSnackBar("Session Expired! Kindly login again.");
            }
            else if (response.status === 400) {
                return that.openSnackBar("Password and Confirm Password , both are required");
            }
            console.log("Error happened", response);
        });
    };
    ChangePasswordComponent = changePassword_component___decorate([
        Object(core_es5["o" /* Component */])({
            selector: 'app-change',
            template: __webpack_require__("./src/app/auth/changePassword/changePassword.component.html"),
            styles: [__webpack_require__("./src/app/auth/changePassword/changePassword.component.css")]
        }),
        changePassword_component___metadata("design:paramtypes", [typeof (_a = typeof router_es5["a" /* ActivatedRoute */] !== "undefined" && router_es5["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof router_es5["b" /* Router */] !== "undefined" && router_es5["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof forms_es5["b" /* FormBuilder */] !== "undefined" && forms_es5["b" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof authentication_service_AuthenticationService !== "undefined" && authentication_service_AuthenticationService) === "function" && _d || Object, typeof (_e = typeof material_es5["h" /* MdSnackBar */] !== "undefined" && material_es5["h" /* MdSnackBar */]) === "function" && _e || Object])
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=changePassword.component.js.map
// CONCATENATED MODULE: ./src/app/auth-guard.service.ts
var auth_guard_service___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var auth_guard_service___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var auth_guard_service_AuthGuard = /** @class */ (function () {
    function AuthGuard(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var url = state.url;
        console.log('AuthGuard#canActivate called');
        return this.checkLogin(url);
    };
    AuthGuard.prototype.checkLogin = function (url) {
        if (this.authService.isLoggedIn && localStorage.getItem('currentUser')) {
            return true;
        }
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;
        // Navigate to the login page with extras
        this.router.navigate(['login']);
        return false;
    };
    AuthGuard = auth_guard_service___decorate([
        Object(core_es5["C" /* Injectable */])(),
        auth_guard_service___metadata("design:paramtypes", [typeof (_a = typeof authentication_service_AuthenticationService !== "undefined" && authentication_service_AuthenticationService) === "function" && _a || Object, typeof (_b = typeof router_es5["b" /* Router */] !== "undefined" && router_es5["b" /* Router */]) === "function" && _b || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());

//# sourceMappingURL=auth-guard.service.js.map
// CONCATENATED MODULE: ./src/app/app-routing.module.ts



// import { ModuleWithProviders } from '@angular/core';







var APPROUTES = [
    {
        path: '', component: auth_component_AuthComponent, children: [
            { path: 'login', component: login_component_LoginComponent },
            { path: 'register', component: register_component_RegisterComponent },
        ]
    },
    { path: 'forgot-password', component: forgotPassword_component_ForgotPasswordComponent },
    { path: 'change-password', component: changePassword_component_ChangePasswordComponent },
    { path: 'reset/:uid/:token', component: forgotConfirm_component_ForgotConfirmComponent },
    {
        path: 'dashboard',
        component: dashboard_component_DashboardComponent,
        canActivate: [auth_guard_service_AuthGuard]
    },
    { path: '**', component: pageNotFound_component_PageNotFoundComponent, }
];
var routing = router_es5["c" /* RouterModule */].forRoot(APPROUTES);
// @NgModule({
//     imports: [
//         RouterModule.forRoot(APPROUTES,
//             { enableTracing: false }
//         )
//     ],
//     exports : [
//         RouterModule
//     ]
// })
// export class MainRouterModule{}
var routingMethods = [pageNotFound_component_PageNotFoundComponent, dashboard_component_DashboardComponent];
//# sourceMappingURL=app-routing.module.js.map
// CONCATENATED MODULE: ./src/app/_services/user.service.ts
var user_service___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var user_service___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var user_service_UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.options = new http_es5["d" /* RequestOptions */]();
        if (this.options.headers == null) {
            this.options.headers = new http_es5["a" /* Headers */]();
        }
        this.options.headers.append('Content-Type', 'application/json');
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.options.headers.append('Authorization', 'JWT ' + currentUser.token);
        console.log("In COnstructor");
        console.log(this.options);
    }
    UserService.prototype.getAll = function () {
        return this.http.get('/users').map(function (response) { return response.json(); });
    };
    // getById(_id: string) {
    //     return this.http.get('/users/' + _id).map((response: Response) => response.json());
    // }
    UserService.prototype.create = function (user) {
        return this.http.post('/users/register', user);
    };
    // update(user: User) {
    //     return this.http.put('/users/' + user._id, user);
    // }
    // delete(_id: string) {
    //     return this.http.delete('/users/' + _id);
    // }
    UserService.prototype.getAllUsers = function () {
        return this.http.get('api/users', this.options)
            .map(function (response) {
            var apiresponse = JSON.stringify(response);
            return apiresponse;
        });
    };
    UserService = user_service___decorate([
        Object(core_es5["C" /* Injectable */])(),
        user_service___metadata("design:paramtypes", [typeof (_a = typeof http_es5["b" /* Http */] !== "undefined" && http_es5["b" /* Http */]) === "function" && _a || Object])
    ], UserService);
    return UserService;
    var _a;
}());

//# sourceMappingURL=user.service.js.map
// EXTERNAL MODULE: ./node_modules/@angular/platform-browser/@angular/platform-browser/animations.es5.js + 1 modules
var animations_es5 = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser/animations.es5.js");

// CONCATENATED MODULE: ./src/app/material.module.ts
var material_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// import {CdkTableModule} from '@angular/cdk';
// import {
//   MdAutocompleteModule,
//   MdButtonModule,
//   MdButtonToggleModule,
//   MdCardModule,
//   MdCheckboxModule,
//   MdChipsModule,
//   MdCoreModule,
//   MdDatepickerModule,
//   MdDialogModule,
//   MdExpansionModule,
//   MdIconModule,
//   MdInputModule,
//   MdListModule,
//   MdMenuModule,
//   MdNativeDateModule,
//   MdPaginatorModule,
//   MdProgressBarModule,
//   MdProgressSpinnerModule,
//   MdRadioModule,
//   MdRippleModule,
//   MdSelectModule,
//   MdSidenavModule,
//   MdSliderModule,
//   MdSlideToggleModule,
//   MdSnackBarModule,
//   MdSortModule,
//   MdTableModule,
//   MdTabsModule,
//   MdToolbarModule,
//   MdTooltipModule,
// } from '@angular/material';
var material_module_MyOwnCustomMaterialModule = /** @class */ (function () {
    function MyOwnCustomMaterialModule() {
    }
    MyOwnCustomMaterialModule = material_module___decorate([
        Object(core_es5["M" /* NgModule */])({
            // imports: [BrowserAnimationsModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule],
            // exports: [BrowserAnimationsModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule],
            exports: [
                animations_es5["a" /* BrowserAnimationsModule */],
                // CdkTableModule,
                // MdAutocompleteModule,
                material_es5["a" /* MdButtonModule */],
                material_es5["f" /* MdMenuModule */],
                // MdButtonToggleModule,
                material_es5["b" /* MdCardModule */],
                // MdCheckboxModule,
                // MdChipsModule,
                // MdCoreModule,
                // MdDatepickerModule,
                // MdDialogModule,
                // MdExpansionModule,
                // MdGridListModule,
                material_es5["c" /* MdIconModule */],
                material_es5["d" /* MdInputModule */],
                // MdListModule,
                material_es5["e" /* MdListModule */],
                // MdNativeDateModule,
                // MdPaginatorModule,
                // MdProgressBarModule,
                material_es5["g" /* MdProgressSpinnerModule */],
                // MdRadioModule,
                // MdRippleModule,
                // MdSelectModule,
                // MdSidenavModule,
                // MdSliderModule,
                // MdSlideToggleModule,
                material_es5["i" /* MdSnackBarModule */],
                // MdSortModule,
                // MdTableModule,
                material_es5["j" /* MdTabsModule */],
                material_es5["k" /* MdToolbarModule */],
            ]
        })
    ], MyOwnCustomMaterialModule);
    return MyOwnCustomMaterialModule;
}());

//# sourceMappingURL=material.module.js.map
// EXTERNAL MODULE: ./node_modules/hammerjs/hammer.js
var hammer = __webpack_require__("./node_modules/hammerjs/hammer.js");
var hammer_default = /*#__PURE__*/__webpack_require__.n(hammer);

// CONCATENATED MODULE: ./src/app/app.module.ts
var app_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var app_module_AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = app_module___decorate([
        Object(core_es5["M" /* NgModule */])({
            declarations: [
                app_component_AppComponent,
            ],
            imports: [
                platform_browser_es5["a" /* BrowserModule */],
                forms_es5["i" /* ReactiveFormsModule */],
                routing,
                http_es5["c" /* HttpModule */],
                material_module_MyOwnCustomMaterialModule,
            ],
            providers: [user_service_UserService, authentication_service_AuthenticationService, auth_guard_service_AuthGuard],
            bootstrap: [app_component_AppComponent]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map
// CONCATENATED MODULE: ./src/environments/environment.ts
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map
// CONCATENATED MODULE: ./src/main.ts




if (environment.production) {
    Object(core_es5["_23" /* enableProdMode */])();
}
Object(platform_browser_dynamic_es5["a" /* platformBrowserDynamic */])().bootstrapModule(app_module_AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map