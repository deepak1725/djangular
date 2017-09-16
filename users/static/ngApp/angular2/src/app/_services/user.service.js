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
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.options = new http_1.RequestOptions();
        if (this.options.headers == null) {
            this.options.headers = new http_1.Headers();
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
    UserService = __decorate([
        core_1.Injectable()
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
