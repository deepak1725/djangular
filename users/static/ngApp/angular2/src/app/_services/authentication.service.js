"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
// import {Observable} from 'rxjs/Rx';
require("rxjs/add/operator/do");
var AuthenticationService = /** @class */ (function () {
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
        this.options = new http_1.RequestOptions();
        if (this.options.headers == null) {
            this.options.headers = new http_1.Headers();
        }
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.headers = new http_1.Headers({ 'Authorization': 'JWT ' + currentUser.token });
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
    AuthenticationService = __decorate([
        core_1.Injectable()
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
