webpackJsonp([1],{

/***/ "./src lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src lazy recursive";

/***/ }),

/***/ "./src/app/404/pageNotFound.component.html":
/***/ (function(module, exports) {

module.exports = "{{title}}"

/***/ }),

/***/ "./src/app/404/pageNotFound.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageNotFoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PageNotFoundComponent = (function () {
    function PageNotFoundComponent() {
        this.title = "Page Not Found";
    }
    return PageNotFoundComponent;
}());
PageNotFoundComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        template: __webpack_require__("./src/app/404/pageNotFound.component.html")
    })
], PageNotFoundComponent);

//# sourceMappingURL=pageNotFound.component.js.map

/***/ }),

/***/ "./src/app/_services/authentication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__("./node_modules/rxjs/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import {Observable} from 'rxjs/Rx';


var AuthenticationService = (function () {
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
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]();
        if (this.options.headers == null) {
            this.options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]();
        }
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Authorization': 'JWT ' + currentUser.token });
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
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* Router */]) === "function" && _b || Object])
], AuthenticationService);

var _a, _b;
//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ "./src/app/_services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]();
        if (this.options.headers == null) {
            this.options.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]();
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
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MainRouterModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routingMethods; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_auth_module__ = __webpack_require__("./src/app/auth/auth.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_component__ = __webpack_require__("./src/app/auth/auth.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__404_pageNotFound_component__ = __webpack_require__("./src/app/404/pageNotFound.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dashboard_dashboard_component__ = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth_forgotConfirm_forgotConfirm_component__ = __webpack_require__("./src/app/auth/forgotConfirm/forgotConfirm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__auth_register_register_component__ = __webpack_require__("./src/app/auth/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__auth_login_login_component__ = __webpack_require__("./src/app/auth/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__auth_forgotPassword_forgotPassword_component__ = __webpack_require__("./src/app/auth/forgotPassword/forgotPassword.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__auth_changePassword_changePassword_component__ = __webpack_require__("./src/app/auth/changePassword/changePassword.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__auth_guard_service__ = __webpack_require__("./src/app/auth-guard.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// import { ModuleWithProviders } from '@angular/core';







var APPROUTES = [
    {
        path: '', component: __WEBPACK_IMPORTED_MODULE_2__auth_auth_component__["a" /* AuthComponent */], children: [
            { path: 'login', component: __WEBPACK_IMPORTED_MODULE_8__auth_login_login_component__["a" /* LoginComponent */] },
            { path: 'register', component: __WEBPACK_IMPORTED_MODULE_7__auth_register_register_component__["a" /* RegisterComponent */] },
        ]
    },
    { path: 'forgot-password', component: __WEBPACK_IMPORTED_MODULE_9__auth_forgotPassword_forgotPassword_component__["a" /* ForgotPasswordComponent */] },
    { path: 'change-password', component: __WEBPACK_IMPORTED_MODULE_10__auth_changePassword_changePassword_component__["a" /* ChangePasswordComponent */] },
    { path: 'reset/:uid/:token', component: __WEBPACK_IMPORTED_MODULE_6__auth_forgotConfirm_forgotConfirm_component__["a" /* ForgotConfirmComponent */] },
    {
        path: 'dashboard',
        component: __WEBPACK_IMPORTED_MODULE_5__dashboard_dashboard_component__["a" /* DashboardComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_11__auth_guard_service__["a" /* AuthGuard */]]
    },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_4__404_pageNotFound_component__["a" /* PageNotFoundComponent */], }
];
var MainRouterModule = (function () {
    function MainRouterModule() {
    }
    return MainRouterModule;
}());
MainRouterModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(APPROUTES, { enableTracing: false })
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */]
        ]
    })
], MainRouterModule);

var routingMethods = [__WEBPACK_IMPORTED_MODULE_1__auth_auth_module__["a" /* AuthMethods */], __WEBPACK_IMPORTED_MODULE_4__404_pageNotFound_component__["a" /* PageNotFoundComponent */], __WEBPACK_IMPORTED_MODULE_5__dashboard_dashboard_component__["a" /* DashboardComponent */]];
//# sourceMappingURL=app-routing.module.js.map

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

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'App Component';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("./src/app/app.component.html"),
        styles: [__webpack_require__("./src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing_module__ = __webpack_require__("./src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_user_service__ = __webpack_require__("./src/app/_services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_authentication_service__ = __webpack_require__("./src/app/_services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__material_module__ = __webpack_require__("./src/app/material.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_hammerjs__ = __webpack_require__("./node_modules/hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__auth_guard_service__ = __webpack_require__("./src/app/auth-guard.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_4__app_routing_module__["a" /* routingMethods */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__app_routing_module__["b" /* MainRouterModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_8__material_module__["a" /* MyOwnCustomMaterialModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* ReactiveFormsModule */],
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_6__services_authentication_service__["a" /* AuthenticationService */], __WEBPACK_IMPORTED_MODULE_10__auth_guard_service__["a" /* AuthGuard */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "./src/app/auth-guard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__ = __webpack_require__("./src/app/_services/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
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
    return AuthGuard;
}());
AuthGuard = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=auth-guard.service.js.map

/***/ }),

/***/ "./src/app/auth/auth.component.html":
/***/ (function(module, exports) {

module.exports = "    <md-card class=\"card-container\">\n        <md-tab-group>\n            <md-tab label=\"LOGIN\" class=\"tablabels\"> \n                <app-login></app-login>\n            </md-tab>\n            <md-tab label=\"REGISTER\" [routerLink]=\"register\">\n                <app-register></app-register>\n            </md-tab>     \n        </md-tab-group>\n    </md-card>        "

/***/ }),

/***/ "./src/app/auth/auth.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AuthComponent = (function () {
    function AuthComponent() {
    }
    return AuthComponent;
}());
AuthComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-auth',
        template: __webpack_require__("./src/app/auth/auth.component.html"),
    })
], AuthComponent);

//# sourceMappingURL=auth.component.js.map

/***/ }),

/***/ "./src/app/auth/auth.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export AuthModule */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthMethods; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_register_component__ = __webpack_require__("./src/app/auth/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_component__ = __webpack_require__("./src/app/auth/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__forgotPassword_forgotPassword_component__ = __webpack_require__("./src/app/auth/forgotPassword/forgotPassword.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__changePassword_changePassword_component__ = __webpack_require__("./src/app/auth/changePassword/changePassword.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth_component__ = __webpack_require__("./src/app/auth/auth.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__forgotConfirm_forgotConfirm_component__ = __webpack_require__("./src/app/auth/forgotConfirm/forgotConfirm.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var AuthModule = (function () {
    function AuthModule() {
    }
    return AuthModule;
}());
AuthModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__register_register_component__["a" /* RegisterComponent */],
            __WEBPACK_IMPORTED_MODULE_4__forgotPassword_forgotPassword_component__["a" /* ForgotPasswordComponent */],
            __WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_5__changePassword_changePassword_component__["a" /* ChangePasswordComponent */],
            __WEBPACK_IMPORTED_MODULE_6__auth_component__["a" /* AuthComponent */],
            __WEBPACK_IMPORTED_MODULE_7__forgotConfirm_forgotConfirm_component__["a" /* ForgotConfirmComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["i" /* FormsModule */]
        ],
        providers: [],
    })
], AuthModule);

var AuthMethods = [
    __WEBPACK_IMPORTED_MODULE_5__changePassword_changePassword_component__["a" /* ChangePasswordComponent */],
    __WEBPACK_IMPORTED_MODULE_4__forgotPassword_forgotPassword_component__["a" /* ForgotPasswordComponent */],
    __WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginComponent */],
    __WEBPACK_IMPORTED_MODULE_2__register_register_component__["a" /* RegisterComponent */],
    __WEBPACK_IMPORTED_MODULE_6__auth_component__["a" /* AuthComponent */],
    __WEBPACK_IMPORTED_MODULE_7__forgotConfirm_forgotConfirm_component__["a" /* ForgotConfirmComponent */]
];
//# sourceMappingURL=auth.module.js.map

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

/***/ "./src/app/auth/changePassword/changePassword.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__ = __webpack_require__("./src/app/_services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("./node_modules/@angular/material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__password_validator__ = __webpack_require__("./src/app/auth/changePassword/password.validator.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ChangePasswordComponent = (function () {
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
            password1: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required],
            password2: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required],
        }, {
            validator: __WEBPACK_IMPORTED_MODULE_5__password_validator__["a" /* PasswordValidation */].MatchPassword
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
    return ChangePasswordComponent;
}());
ChangePasswordComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-change',
        template: __webpack_require__("./src/app/auth/changePassword/changePassword.component.html"),
        styles: [__webpack_require__("./src/app/auth/changePassword/changePassword.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["k" /* MdSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["k" /* MdSnackBar */]) === "function" && _e || Object])
], ChangePasswordComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=changePassword.component.js.map

/***/ }),

/***/ "./src/app/auth/changePassword/password.validator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordValidation; });
var PasswordValidation = (function () {
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

/***/ }),

/***/ "./src/app/auth/forgotConfirm/forgotConfirm.component.html":
/***/ (function(module, exports) {

module.exports = "    <md-card>\n        <md-toolbar>\n            <md-card-title>\n                {{this.title}}\n            </md-card-title>\n        </md-toolbar>\n            <!-- Inputs -->\n        <md-card-content>\n            <form [formGroup]=\"forgotConfirmForm\">\n            \n                    <p>\n                        <md-input-container class=\"col-md-12 form-group\">\n                            <input mdInput type=\"password1\" placeholder=\"Password\" formControlName=\"password1\">\n                            <md-error>\n                                Please enter your <strong>Password</strong>\n                            </md-error>\n                        </md-input-container>\n                    </p>\n                    <p>\n                        <md-input-container class=\"col-md-12 form-group\">\n                            <input mdInput type=\"password2\" placeholder=\"Confirm Password\" formControlName=\"password2\">\n                            <md-error>\n                                Please confirm your <strong>Password</strong>\n                            </md-error>\n                        </md-input-container>\n                    </p>\n                    <div>\n                        <button mdInput style=\"margin:20px 15px\" type=\"submit\" md-raised-button color=\"primary\" (click)=\"forgotConfirm()\">Submit</button>\n                    </div>\n            </form>\n        </md-card-content>\n        <md-card-footer class=\"text-center\">\n            <!-- Footer -->\n            <a routerLink=\"/login\" > <small>Login </small></a>|\n            <a routerLink=\"/register\" > <small>Register </small></a>\n            <!-- <small> Login.</small>   -->\n        </md-card-footer>\n    </md-card>\n        "

/***/ }),

/***/ "./src/app/auth/forgotConfirm/forgotConfirm.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotConfirmComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_authentication_service__ = __webpack_require__("./src/app/_services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("./node_modules/@angular/material/@angular/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ForgotConfirmComponent = (function () {
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
            password1: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required],
            password2: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required],
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
    return ForgotConfirmComponent;
}());
ForgotConfirmComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-forgotConfirm',
        template: __webpack_require__("./src/app/auth/forgotConfirm/forgotConfirm.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_authentication_service__["a" /* AuthenticationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["k" /* MdSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["k" /* MdSnackBar */]) === "function" && _d || Object])
], ForgotConfirmComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=forgotConfirm.component.js.map

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

/***/ "./src/app/auth/forgotPassword/forgotPassword.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__ = __webpack_require__("./src/app/_services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_material__ = __webpack_require__("./node_modules/@angular/material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ForgotPasswordComponent = (function () {
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
            email: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* Validators */].required],
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
    return ForgotPasswordComponent;
}());
ForgotPasswordComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-forgot',
        template: __webpack_require__("./src/app/auth/forgotPassword/forgotPassword.component.html"),
        styles: [__webpack_require__("./src/app/auth/forgotPassword/forgotPassword.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_forms__["j" /* FormBuilder */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_material__["k" /* MdSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_material__["k" /* MdSnackBar */]) === "function" && _e || Object])
], ForgotPasswordComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=forgotPassword.component.js.map

/***/ }),

/***/ "./src/app/auth/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "    <md-toolbar>\n        <md-card-title>\n\t        {{this.title}}\n        </md-card-title>\n    </md-toolbar>\n        <!-- Inputs -->\n    <md-card-content>\n        <form [formGroup]=\"loginForm\">\n                <p> \n                    <md-input-container>\n                        <input mdInput placeholder=\"Username\" formControlName=\"username\">\n                        <md-error>\n                            Please enter your <strong>username</strong>\n                        </md-error>\n                    </md-input-container>\n                </p>\n        \n                <p>\n                    <md-input-container>\n                        <input mdInput type=\"password\" placeholder=\"Password\" formControlName=\"password\">\n                        <md-error>\n                            Please enter your <strong>password</strong>\n                        </md-error>\n                    </md-input-container>\n                </p>\n                <div>\n                    <button mdInput [disabled]=!loginForm.valid type=\"submit\" md-raised-button color=\"primary\" (click)=\"loginUser()\">Submit</button>\n                </div>\n        </form>\n    </md-card-content>\n    <md-card-footer class=\"text-center\">\n        <!-- Footer -->\n        <a routerLink=\"/register\"> <small>REGISTER &nbsp;</small></a>|\n        <a routerLink=\"/forgot-password\"> <small>FORGOT PASSWORD </small></a>\n    </md-card-footer>\n\n"

/***/ }),

/***/ "./src/app/auth/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__ = __webpack_require__("./src/app/_services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("./node_modules/@angular/material/@angular/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = (function () {
    function LoginComponent(formBuilder, route, router, authenticationService, snackBar) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.snackBar = snackBar;
        this.title = 'Login';
        this.emailFormControl = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["k" /* FormControl */]('', [
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required,
        ]);
        this.passwordFormControl = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["k" /* FormControl */]('', [
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required,
        ]);
        this.openSnackBar = function (message) {
            this.snackBar.open(message, " ", {
                duration: 2000,
            });
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
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
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__("./src/app/auth/login/login.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["j" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["j" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["k" /* MdSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["k" /* MdSnackBar */]) === "function" && _e || Object])
], LoginComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=login.component.js.map

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

/***/ "./src/app/auth/register/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__ = __webpack_require__("./src/app/_services/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_material__ = __webpack_require__("./node_modules/@angular/material/@angular/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = (function () {
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
            username: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
            first_name: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
            last_name: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
            email: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required],
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
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-register',
        template: __webpack_require__("./src/app/auth/register/register.component.html"),
        styles: [__webpack_require__("./src/app/auth/register/register.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_forms__["j" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_forms__["j" /* FormBuilder */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_authentication_service__["a" /* AuthenticationService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__angular_material__["k" /* MdSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_material__["k" /* MdSnackBar */]) === "function" && _e || Object])
], RegisterComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "Welcome to Dashboard\n\n<a [routerLink]=\"dashboard\">Dashboard</a>"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__ = __webpack_require__("./src/app/_services/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DashboardComponent = (function () {
    function DashboardComponent(authenticationService) {
        this.authenticationService = authenticationService;
        this.title = 'Dashboard';
    }
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* Component */])({
        selector: 'app-dashboard',
        template: __webpack_require__("./src/app/dashboard/dashboard.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_authentication_service__["a" /* AuthenticationService */]) === "function" && _a || Object])
], DashboardComponent);

var _a;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "./src/app/material.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyOwnCustomMaterialModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("./node_modules/@angular/material/@angular/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser/animations.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
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
var MyOwnCustomMaterialModule = (function () {
    function MyOwnCustomMaterialModule() {
    }
    return MyOwnCustomMaterialModule;
}());
MyOwnCustomMaterialModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        // imports: [BrowserAnimationsModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule],
        // exports: [BrowserAnimationsModule, MdButtonModule, MdCheckboxModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            // CdkTableModule,
            // MdAutocompleteModule,
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MdButtonModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdMenuModule */],
            // MdButtonToggleModule,
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdCardModule */],
            // MdCheckboxModule,
            // MdChipsModule,
            // MdCoreModule,
            // MdDatepickerModule,
            // MdDialogModule,
            // MdExpansionModule,
            // MdGridListModule,
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MdIconModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MdInputModule */],
            // MdListModule,
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MdListModule */],
            // MdNativeDateModule,
            // MdPaginatorModule,
            // MdProgressBarModule,
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MdProgressSpinnerModule */],
            // MdRadioModule,
            // MdRippleModule,
            // MdSelectModule,
            // MdSidenavModule,
            // MdSliderModule,
            // MdSlideToggleModule,
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MdSnackBarModule */],
            // MdSortModule,
            // MdTableModule,
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MdTabsModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_material__["j" /* MdToolbarModule */],
        ]
    })
], MyOwnCustomMaterialModule);

//# sourceMappingURL=material.module.js.map

/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map